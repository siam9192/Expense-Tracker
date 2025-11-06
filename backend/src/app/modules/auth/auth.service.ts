import { compare } from "bcrypt";
import appConfig from "../../config/app.config";
import envConfig from "../../config/env.config";
import AppError from "../../errors/AppError";

import { encrypt } from "../../helpers/bycrypt.helper";
import {
  generateOTP,
  getLocationDetailsByIp,
} from "../../helpers/global.helper";
import { generateJwtToken, verifyJwtToken } from "../../helpers/jwt.helper";
import prisma from "../../prisma-client";
import httpStatus from "../../shared/http-status";

import {
  AuthUser,
  ChangePasswordPayload,
  InitUserPayload,
  JwtInitUserOtpVerificationPayload,
  LoginPayload,
  ResendVerificationOTPPayload,
  VerifyInitUserPayload,
} from "./auth.interface";
import { UserRole } from "../user/user.interface";
import { OTPVerificationStatus, SessionStatus } from "@prisma/client";

class AuthService {
  async initUserIntoDB(payload: InitUserPayload) {
    const user = await prisma.user.findFirst({
      where: {
        auth_info: {
          email: payload.email,
        },
      },
    });
    if (user) {
      throw new AppError(httpStatus.FORBIDDEN, "User is already exist!");
    }
    const locationDetails = await getLocationDetailsByIp(
      payload.session_info.ip,
    );
    if (!locationDetails) {
      throw new Error();
    }
    return await prisma.$transaction(async (tx) => {
      const generatedOTP = generateOTP(4);

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 1); // 1 day expiry

      const createdVerification = await tx.otpVerification.create({
        data: {
          expires_at: expiresAt,
          codes: {
            create: {
              code: generatedOTP,
            },
          },
          status: OTPVerificationStatus.PENDING,
        },
      });

      const encryptedPassword = encrypt(payload.password);

      const createdInitUser = await tx.userInit.create({
        data: {
          email: payload.email,
          password: encryptedPassword,
          ...payload.session_info,
          address: locationDetails.address_str,
          verification_id: createdVerification.id,
        },
      });

      const tokenPayload = {
        init_user_id: createdInitUser.id,
        verification_id: createdVerification.id,
      };
      const token = generateJwtToken(
        tokenPayload,
        envConfig.jwt.otp_verification_token_secret as string,
        `${appConfig.otp_verification_token_expire_hours}h`,
      );

      return {
        token,
        otp: generatedOTP,
      };
    });
  }

  async verifyInitUser(payload: VerifyInitUserPayload) {
    // 1️⃣ Verify token validity
    let decoded: JwtInitUserOtpVerificationPayload;
    try {
      decoded = (await verifyJwtToken(
        payload.token,
        envConfig.jwt.otp_verification_token_secret as string,
      )) as JwtInitUserOtpVerificationPayload;
    } catch {
      throw new AppError(httpStatus.FORBIDDEN, "Invalid or expired token!");
    }

    // 2️⃣ Fetch OTP verification record
    const verification = await prisma.otpVerification.findUnique({
      where: { id: decoded.verification_id },
      include: { codes: true },
    });

    if (!verification) {
      throw new AppError(httpStatus.FORBIDDEN, "Invalid verification record!");
    }

    // Check OTP expiration
    if (new Date() > verification.expires_at) {
      throw new AppError(httpStatus.FORBIDDEN, "OTP has expired!");
    }

    // 3️⃣ Validate OTP
    const isValidOTP = verification.codes.some((c) => c.code === payload.otp);
    if (!isValidOTP) {
      throw new AppError(httpStatus.FORBIDDEN, "Wrong OTP!");
    }

    // 4️⃣ Validate pending init user
    const userInit = await prisma.userInit.findUnique({
      where: { id: decoded.init_user_id },
    });

    if (!userInit) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "User initialization not found!",
      );
    }

    // 5️⃣ Run atomic transaction
    return await prisma.$transaction(async (tx) => {
      const sessionExpiresAt = new Date();
      sessionExpiresAt.setDate(
        sessionExpiresAt.getDate() + appConfig.refresh_token_expire_days,
      );

      // ✅ Update verification status
      await tx.otpVerification.update({
        where: { id: verification.id },
        data: { status: OTPVerificationStatus.VERIFIED },
      });

      // ✅ Mark userInit as verified
      await tx.userInit.update({
        where: { id: userInit.id },
        data: { isVerified: true },
      });

      // ✅ Create user + session
      const createdUser = await tx.user.create({
        data: {
          auth_info: {
            create: {
              email: userInit.email,
              password: userInit.password,
            },
          },
          sessions: {
            create: {
              device_name: userInit.device_name ?? "Unknown Device",
              address: userInit.address ?? "",
              ip: userInit.ip ?? "",
              expires_at: sessionExpiresAt,
              token: "",
              status: SessionStatus.ACTIVE,
            },
          },
        },
        include: { sessions: true },
      });

      // ✅ Generate tokens
      const tokenPayload = {
        user_id: createdUser.id,
        role: UserRole.USER,
        session_id: createdUser.sessions[0].id,
      };

      const accessToken = generateJwtToken(
        tokenPayload,
        envConfig.jwt.access_token_secret as string,
        `${appConfig.access_token_expire_days}d`,
      );

      const refreshToken = generateJwtToken(
        tokenPayload,
        envConfig.jwt.refresh_token_secret as string,
        `${appConfig.refresh_token_expire_days}d`,
      );

      return {
        token: {
          access: accessToken,
          refresh: refreshToken,
        },
        expires: {
          access: new Date(
            Date.now() +
              appConfig.access_token_expire_days * 24 * 60 * 60 * 1000,
          ),
          refresh: new Date(
            Date.now() +
              appConfig.refresh_token_expire_days * 24 * 60 * 60 * 1000,
          ),
        },
      };
    });
  }

  async resendVerificationOTP(payload: ResendVerificationOTPPayload) {
    let decode;
    try {
      decode = (await verifyJwtToken(
        payload.token,
        envConfig.jwt.otp_verification_token_secret as string,
      )) as JwtInitUserOtpVerificationPayload;
    } catch (error) {
      throw new AppError(httpStatus.FORBIDDEN, "Invalid request");
    }

    const verification = await prisma.otpVerification.findUnique({
      where: {
        id: decode.verification_id,
        status: OTPVerificationStatus.PENDING,
      },
      include: {
        codes: true,
      },
    });

    if (!verification) {
      throw new AppError(httpStatus.FORBIDDEN, "Invalid verification record!");
    }

    // Check OTP expiration
    if (new Date() > verification.expires_at) {
      throw new AppError(httpStatus.FORBIDDEN, "OTP has expired!");
    }

    const generatedOTP = generateOTP();

    await prisma.otpCodes.create({
      data: {
        verification_id: verification.id,
        code: generatedOTP,
      },
    });

    return {
      otp: generatedOTP,
    };
  }

  async userLogin(payload: LoginPayload) {
    const user = await prisma.user.findFirst({
      where: {
        auth_info: {
          email: payload.email,
        },
      },
      include: {
        auth_info: true,
      },
    });

    // Checking user existence
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "Wrong email or password");
    }

    // Comparing password
    const isMatched = await compare(payload.password, user.auth_info!.password);

    // Checking is password correct
    if (!isMatched) {
      throw new AppError(httpStatus.NOT_ACCEPTABLE, "Wrong password");
    }

    const locationDetails = await getLocationDetailsByIp(
      payload.session_info.ip,
    );
    if (!locationDetails) {
      throw new Error();
    }

    const sessionExpiresAt = new Date();
    sessionExpiresAt.setDate(
      sessionExpiresAt.getDate() + appConfig.refresh_token_expire_days,
    );

    const createdSession = await prisma.session.create({
      data: {
        user_id: user.id,
        ...payload.session_info,
        address: locationDetails.address_str,
        token: "",
        expires_at: sessionExpiresAt,
      },
    });

    const tokenPayload: AuthUser = {
      user_id: user.id,
      role: UserRole.USER,
      session_id: createdSession.id,
    };

    const accessToken = generateJwtToken(
      tokenPayload,
      envConfig.jwt.access_token_secret as string,
      `${appConfig.access_token_expire_days}d`,
    );

    const refreshToken = generateJwtToken(
      tokenPayload,
      envConfig.jwt.refresh_token_secret as string,
      `${appConfig.refresh_token_expire_days}d`,
    );

    return {
      token: {
        access: accessToken,
        refresh: refreshToken,
      },
      expires: {
        access: new Date(
          Date.now() + appConfig.access_token_expire_days * 24 * 60 * 60 * 1000,
        ),
        refresh: new Date(
          Date.now() +
            appConfig.refresh_token_expire_days * 24 * 60 * 60 * 1000,
        ),
      },
    };
  }

  async useSignout(authUser: AuthUser) {
    await prisma.session.delete({
      where: {
        id: authUser.session_id,
      },
    });
    return null;
  }

  async changePassword(authUser: AuthUser, payload: ChangePasswordPayload) {
    // Compare old password
    const isPasswordMatch = await compare(
      payload.oldPassword,
      payload.oldPassword,
    );

    if (!isPasswordMatch) {
      throw new AppError(
        httpStatus.NOT_ACCEPTABLE,
        "Incorrect current password.",
      );
    }
    // Hash the new password
    const newEncryptedPassword = encrypt(payload.newPassword);

    await prisma.authInfo.update({
      where: {
        user_id: authUser.user_id,
      },
      data: {
        password: newEncryptedPassword,
        password_changed_at: new Date(),
      },
    });

    const sessionExpiresAt = new Date();
    sessionExpiresAt.setDate(
      sessionExpiresAt.getDate() + appConfig.refresh_token_expire_days,
    );

    await prisma.session.update({
      where: {
        id: authUser.session_id,
      },
      data: {
        expires_at: sessionExpiresAt,
      },
    });

    if (payload.signout_others) {
      await prisma.session.deleteMany({
        where: {
          id: {
            not: authUser.session_id,
          },
          user_id: authUser.user_id,
        },
      });
    }

    const tokenPayload = {
      user_id: authUser.user_id,
      role: authUser.role,
      session_id: authUser.session_id,
    };

    const accessToken = generateJwtToken(
      tokenPayload,
      envConfig.jwt.access_token_secret as string,
      `${appConfig.access_token_expire_days}d`,
    );

    const refreshToken = generateJwtToken(
      tokenPayload,
      envConfig.jwt.refresh_token_secret as string,
      `${appConfig.refresh_token_expire_days}d`,
    );

    // Return success (can be null or a success message)
    return {
      token: {
        access: accessToken,
        refresh: refreshToken,
      },
      expires: {
        access: new Date(
          Date.now() + appConfig.access_token_expire_days * 24 * 60 * 60 * 1000,
        ),
        refresh: new Date(
          Date.now() +
            appConfig.refresh_token_expire_days * 24 * 60 * 60 * 1000,
        ),
      },
    };
  }

  async getNewAccessToken(refreshToken: string) {
    try {
      // Step 1: Ensure refresh token exists
      if (!refreshToken) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "Refresh token is required.",
        );
      }

      // Step 2: Verify and decode the token
      const decoded = verifyJwtToken(
        refreshToken,
        envConfig.jwt.refresh_token_secret as string,
      ) as AuthUser;

      if (!decoded || !decoded.userId) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid refresh token.");
      }
      // Step 3: Create a new access token
      const newAccessToken = await generateJwtToken(
        {
          id: decoded.userId,
          role: decoded.role,
        },
        envConfig.jwt.access_token_secret as string,
        appConfig.access_token_expire_days + "d",
      );

      // Step 4: Return both tokens
      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Invalid or expired refresh token.",
      );
    }
  }
}

export default new AuthService();
