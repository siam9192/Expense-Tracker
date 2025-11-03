import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "../shared/http-status";
import envConfig from "../config/env.config";
import { UserRole } from "../modules/user/user.interface";
import { AuthUser } from "../modules/auth/auth.interface";
import prisma from "../prisma-client";
import { UserStatus } from "@prisma/client";

function auth(
  requiredRoles: UserRole[],
  configs?: {
    require_profile_complete?: boolean;
  },
) {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // checking if the given token is valid
    let decoded;

    try {
      decoded = jwt.verify(
        token,
        envConfig.jwt.access_token_secret as string,
      ) as AuthUser & JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }

    // checking if the user is exist
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.user_id,
      },
      include: {
        auth_info: true,
      },
    });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    if (
      configs?.require_profile_complete !== false &&
      user.isSetupComplete === false
    ) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "This user profile setup completely !",
      );
    }

    // checking if the user is already deleted
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted ! !");
    }

    // checking if the user is blocked

    if (user.status === UserStatus.BLOCKED) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
    }

    const session = await prisma.session.findUnique({
      where: { id: decoded.session_id },
    });

    if (!session) {
      throw new AppError(
        httpStatus.UNAUTHORIZED, // 401 status code
        "Session not found or already logged out",
      );
    }

    if (requiredRoles && !requiredRoles.includes(decoded.role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized  !");
    }

    req.user = decoded;

    next();
  });
}

export default auth;
