import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../user/user.interface";

export interface AuthUser extends JwtPayload {
  user_id: number;
  role: UserRole;
  session_id: string;
}

export interface JwtInitUserOtpVerificationPayload {
  init_user_id: string;
  verification_id: string;
}

export interface ResendVerificationOTPPayload {
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  session_info: {
    device_name: string;
    address: string;
    ip: string;
  };
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  signout_others: boolean;
}

export interface InitUserPayload {
  email: string;
  password: string;
  session_info: {
    device_name: string;
    ip: string;
  };
}

export interface VerifyInitUserPayload {
  token: string;
  otp: string;
}
