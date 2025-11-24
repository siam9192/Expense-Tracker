"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const app_config_1 = __importDefault(require("../../config/app.config"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bycrypt_helper_1 = require("../../helpers/bycrypt.helper");
const global_helper_1 = require("../../helpers/global.helper");
const jwt_helper_1 = require("../../helpers/jwt.helper");
const prisma_client_1 = __importDefault(require("../../prisma-client"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
const user_interface_1 = require("../user/user.interface");
const client_1 = require("@prisma/client");
class AuthService {
    initUserIntoDB(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_client_1.default.user.findFirst({
                where: {
                    auth_info: {
                        email: payload.email,
                    },
                },
            });
            if (user) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User is already exist!");
            }
            const locationDetails = yield (0, global_helper_1.getLocationDetailsByIp)(payload.session_info.ip);
            if (!locationDetails) {
                throw new Error();
            }
            return yield prisma_client_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const generatedOTP = (0, global_helper_1.generateOTP)(4);
                const expiresAt = new Date();
                expiresAt.setDate(expiresAt.getDate() + 1); // 1 day expiry
                const createdVerification = yield tx.otpVerification.create({
                    data: {
                        expires_at: expiresAt,
                        codes: {
                            create: {
                                code: generatedOTP,
                            },
                        },
                        status: client_1.OTPVerificationStatus.PENDING,
                    },
                });
                const encryptedPassword = (0, bycrypt_helper_1.encrypt)(payload.password);
                const createdInitUser = yield tx.userInit.create({
                    data: Object.assign(Object.assign({ email: payload.email, password: encryptedPassword }, payload.session_info), { address: locationDetails.address_str, verification_id: createdVerification.id }),
                });
                const tokenPayload = {
                    init_user_id: createdInitUser.id,
                    verification_id: createdVerification.id,
                };
                const token = (0, jwt_helper_1.generateJwtToken)(tokenPayload, env_config_1.default.jwt.otp_verification_token_secret, `${app_config_1.default.otp_verification_token_expire_hours}h`);
                return {
                    token,
                    otp: generatedOTP,
                };
            }));
        });
    }
    verifyInitUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // 1️⃣ Verify token validity
            let decoded;
            try {
                decoded = (yield (0, jwt_helper_1.verifyJwtToken)(payload.token, env_config_1.default.jwt.otp_verification_token_secret));
            }
            catch (_a) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Invalid or expired token!");
            }
            // 2️⃣ Fetch OTP verification record
            const verification = yield prisma_client_1.default.otpVerification.findUnique({
                where: { id: decoded.verification_id },
                include: { codes: true },
            });
            if (!verification) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Invalid verification record!");
            }
            // Check OTP expiration
            if (new Date() > verification.expires_at) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "OTP has expired!");
            }
            // 3️⃣ Validate OTP
            const isValidOTP = verification.codes.some((c) => c.code === payload.otp);
            if (!isValidOTP) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Wrong OTP!");
            }
            // 4️⃣ Validate pending init user
            const userInit = yield prisma_client_1.default.userInit.findUnique({
                where: { id: decoded.init_user_id },
            });
            if (!userInit) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User initialization not found!");
            }
            // 5️⃣ Run atomic transaction
            return yield prisma_client_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                var _b, _c, _d;
                const sessionExpiresAt = new Date();
                sessionExpiresAt.setDate(sessionExpiresAt.getDate() + app_config_1.default.refresh_token_expire_days);
                // ✅ Update verification status
                yield tx.otpVerification.update({
                    where: { id: verification.id },
                    data: { status: client_1.OTPVerificationStatus.VERIFIED },
                });
                // ✅ Mark userInit as verified
                yield tx.userInit.update({
                    where: { id: userInit.id },
                    data: { isVerified: true },
                });
                // ✅ Create user + session
                const createdUser = yield tx.user.create({
                    data: {
                        auth_info: {
                            create: {
                                email: userInit.email,
                                password: userInit.password,
                            },
                        },
                        sessions: {
                            create: {
                                device_name: (_b = userInit.device_name) !== null && _b !== void 0 ? _b : "Unknown Device",
                                address: (_c = userInit.address) !== null && _c !== void 0 ? _c : "",
                                ip: (_d = userInit.ip) !== null && _d !== void 0 ? _d : "",
                                expires_at: sessionExpiresAt,
                                token: "",
                                status: client_1.SessionStatus.ACTIVE,
                            },
                        },
                    },
                    include: { sessions: true },
                });
                // ✅ Generate tokens
                const tokenPayload = {
                    user_id: createdUser.id,
                    role: user_interface_1.UserRole.USER,
                    session_id: createdUser.sessions[0].id,
                };
                const accessToken = (0, jwt_helper_1.generateJwtToken)(tokenPayload, env_config_1.default.jwt.access_token_secret, `${app_config_1.default.access_token_expire_days}d`);
                const refreshToken = (0, jwt_helper_1.generateJwtToken)(tokenPayload, env_config_1.default.jwt.refresh_token_secret, `${app_config_1.default.refresh_token_expire_days}d`);
                return {
                    token: {
                        access: accessToken,
                        refresh: refreshToken,
                    },
                    expires: {
                        access: new Date(Date.now() +
                            app_config_1.default.access_token_expire_days * 24 * 60 * 60 * 1000),
                        refresh: new Date(Date.now() +
                            app_config_1.default.refresh_token_expire_days * 24 * 60 * 60 * 1000),
                    },
                };
            }));
        });
    }
    resendVerificationOTP(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let decode;
            try {
                decode = (yield (0, jwt_helper_1.verifyJwtToken)(payload.token, env_config_1.default.jwt.otp_verification_token_secret));
            }
            catch (error) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Invalid request");
            }
            const verification = yield prisma_client_1.default.otpVerification.findUnique({
                where: {
                    id: decode.verification_id,
                    status: client_1.OTPVerificationStatus.PENDING,
                },
                include: {
                    codes: true,
                },
            });
            if (!verification) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Invalid verification record!");
            }
            // Check OTP expiration
            if (new Date() > verification.expires_at) {
                throw new AppError_1.default(http_status_1.default.FORBIDDEN, "OTP has expired!");
            }
            const generatedOTP = (0, global_helper_1.generateOTP)(4);
            yield prisma_client_1.default.otpCodes.create({
                data: {
                    verification_id: verification.id,
                    code: generatedOTP,
                },
            });
            return {
                otp: generatedOTP,
            };
        });
    }
    userLogin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_client_1.default.user.findFirst({
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
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Wrong email or password");
            }
            // Comparing password
            const isMatched = yield (0, bcrypt_1.compare)(payload.password, user.auth_info.password);
            // Checking is password correct
            if (!isMatched) {
                throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Wrong password");
            }
            const locationDetails = yield (0, global_helper_1.getLocationDetailsByIp)(payload.session_info.ip);
            if (!locationDetails) {
                throw new Error();
            }
            const sessionExpiresAt = new Date();
            sessionExpiresAt.setDate(sessionExpiresAt.getDate() + app_config_1.default.refresh_token_expire_days);
            const createdSession = yield prisma_client_1.default.session.create({
                data: Object.assign(Object.assign({ user_id: user.id }, payload.session_info), { address: locationDetails.address_str, token: "", expires_at: sessionExpiresAt }),
            });
            const tokenPayload = {
                user_id: user.id,
                role: user_interface_1.UserRole.USER,
                session_id: createdSession.id,
            };
            const accessToken = (0, jwt_helper_1.generateJwtToken)(tokenPayload, env_config_1.default.jwt.access_token_secret, `${app_config_1.default.access_token_expire_days}d`);
            const refreshToken = (0, jwt_helper_1.generateJwtToken)(tokenPayload, env_config_1.default.jwt.refresh_token_secret, `${app_config_1.default.refresh_token_expire_days}d`);
            return {
                token: {
                    access: accessToken,
                    refresh: refreshToken,
                },
                expires: {
                    access: new Date(Date.now() + app_config_1.default.access_token_expire_days * 24 * 60 * 60 * 1000),
                    refresh: new Date(Date.now() +
                        app_config_1.default.refresh_token_expire_days * 24 * 60 * 60 * 1000),
                },
            };
        });
    }
    useSignout(authUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_client_1.default.session.delete({
                where: {
                    id: authUser.session_id,
                },
            });
            return null;
        });
    }
    changePassword(authUser, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = yield prisma_client_1.default.authInfo.findUnique({
                where: {
                    user_id: authUser.user_id,
                },
            });
            if (!auth)
                throw new Error();
            // Compare old password
            const isPasswordMatch = yield (0, bcrypt_1.compare)(payload.old_password, auth.password);
            if (!isPasswordMatch) {
                throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Incorrect current password.");
            }
            // Hash the new password
            const newEncryptedPassword = (0, bycrypt_helper_1.encrypt)(payload.new_password);
            yield prisma_client_1.default.authInfo.update({
                where: {
                    user_id: authUser.user_id,
                },
                data: {
                    password: newEncryptedPassword,
                    password_changed_at: new Date(),
                },
            });
            const sessionExpiresAt = new Date();
            sessionExpiresAt.setDate(sessionExpiresAt.getDate() + app_config_1.default.refresh_token_expire_days);
            yield prisma_client_1.default.session.update({
                where: {
                    id: authUser.session_id,
                },
                data: {
                    expires_at: sessionExpiresAt,
                },
            });
            if (payload.signout_others) {
                yield prisma_client_1.default.session.deleteMany({
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
            const accessToken = (0, jwt_helper_1.generateJwtToken)(tokenPayload, env_config_1.default.jwt.access_token_secret, `${app_config_1.default.access_token_expire_days}d`);
            const refreshToken = (0, jwt_helper_1.generateJwtToken)(tokenPayload, env_config_1.default.jwt.refresh_token_secret, `${app_config_1.default.refresh_token_expire_days}d`);
            // Return success (can be null or a success message)
            return {
                token: {
                    access: accessToken,
                    refresh: refreshToken,
                },
                expires: {
                    access: new Date(Date.now() + app_config_1.default.access_token_expire_days * 24 * 60 * 60 * 1000),
                    refresh: new Date(Date.now() +
                        app_config_1.default.refresh_token_expire_days * 24 * 60 * 60 * 1000),
                },
            };
        });
    }
    getNewAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Step 1: Ensure refresh token exists
                if (!refreshToken) {
                    throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Refresh token is required.");
                }
                let decoded;
                try {
                    // Step 2: Verify and decode the token
                    decoded = (0, jwt_helper_1.verifyJwtToken)(refreshToken, env_config_1.default.jwt.refresh_token_secret);
                    if (!decoded || !decoded.userId) {
                        throw new Error();
                    }
                }
                catch (error) {
                    throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid refresh token.");
                }
                // Step 3: Create a new access token
                const newAccessToken = yield (0, jwt_helper_1.generateJwtToken)({
                    id: decoded.userId,
                    role: decoded.role,
                }, env_config_1.default.jwt.access_token_secret, app_config_1.default.access_token_expire_days + "d");
                const newRefreshToken = yield (0, jwt_helper_1.generateJwtToken)({
                    id: decoded.userId,
                    role: decoded.role,
                }, env_config_1.default.jwt.refresh_token_secret, app_config_1.default.refresh_token_expire_days + "d");
                // Step 4: Return both tokens
                return {
                    token: {
                        access: newAccessToken,
                        refresh: newRefreshToken,
                    },
                    expires: {
                        access: new Date(Date.now() +
                            app_config_1.default.access_token_expire_days * 24 * 60 * 60 * 1000),
                        refresh: new Date(Date.now() +
                            app_config_1.default.refresh_token_expire_days * 24 * 60 * 60 * 1000),
                    },
                };
            }
            catch (error) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid or expired refresh token.");
            }
        });
    }
}
exports.default = new AuthService();
