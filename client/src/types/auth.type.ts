export interface SignupPayload {
  email: string;
  password: string;
  session_info: {
    device_name: string;
    ip: string;
  };
}

export type ResendOTPPayload = {
  token: string;
};

export type SignupVerifyPayload = {
  token: string;
  otp: string;
};

export type SignupVerifyResponseData = {
  token: {
    access: string;
    refresh: string;
  };
  expires: {
    access: number;
    refresh: number;
  };
};

export type SigninResponseData = {
  token: {
    access: string;
    refresh: string;
  };
  expires: {
    access: number;
    refresh: number;
  };
};

export type SignupResponseData = {
  otp: string;
  token: string;
};

export type SigninPayload = {
  email: string;
  password: string;
  session_info: {
    device_name: string;
    ip: string;
  };
};

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  signout_others: boolean;
}
