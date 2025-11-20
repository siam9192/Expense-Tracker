import type { Avatar } from "./avatar.type";
import type { Country } from "./country.type";
import type { Currency } from "./currency.type";
import type Profession from "./profession.type";

export interface UserProfileSetupProfilePayload {
  name: string;
  avatar_id: number;
  profession_id: number;
  country_id: number;
  currency_id: number;
  monthly_budget: number;
  spendable_balance: number;
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export interface Wallet {
  id: number;
  user_id: number;
  total_balance: number;
  spendable_balance: number;
  saving_balance: number;
  created_at: number;
  updated_at: number;
}

export interface CurrentUser {
  name: string;
  email: string;
  gender: Gender;
  profile_picture: string | null;
  avatar: Avatar;
  profession: Profession;
  country: Country;
  currency: Currency;
  wallet: Wallet;
  joined_at: Date | string;
}

export interface IncompleteUser {
  email: string;
  isSetupComplete: boolean;
}

export type GetCurrentUserResponseData = CurrentUser | IncompleteUser;

export interface UserSettings {
  id: number;
  user_id: number;

  auto_saving: boolean;
  balance_expense_income_alert: boolean;
  email_alerts: boolean;
  sms_alerts: boolean;
  transaction_updates: boolean;
  two_factor_auth: boolean;
  monthly_budget: number;

  currency_id: number;
  currency: Currency;

  created_at: Date | string;
  updated_at: Date | string;

  user: CurrentUser;
}

export interface SetupUserProfileResponseData {
  isSetupComplete: boolean;
}

export interface UpdateUserSettingsPayload
  extends Partial<{
    auto_saving: boolean;
    balance_expense_income_alert: boolean;
    email_alerts: boolean;
    sms_alerts: boolean;
    transaction_updates: boolean;
    two_factor_auth: boolean;
    monthly_budget: number;
  }> {}

  

export enum SessionStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED"
}


  export interface UserSession {
     id:number
  user_id:number
  device_name:string
  address:string
  ip:string
  status:SessionStatus
  created_at:Date|string,
  current:boolean
  }