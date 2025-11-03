export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface SetupUserProfilePayload {
  name: string;
  avatar_id: number;
  profession_id: number;
  country_id: number;
  currency_id: number;
  monthly_budget: number;
  spendable_balance: number;
}

export interface UpdateUserProfilePayload
  extends Partial<{
    name: string;
    profile_picture: string;
    avatar_id: number;
    profession_id: number;
    country_id: number;
  }> {}

  export interface UpdateCurrentUserSettingsPayload extends Partial <{
    auto_saving:boolean
  balance_expense_income_alert:boolean
  email_alerts:boolean
  sms_alerts:boolean
  transaction_updates:boolean
  two_factor_auth:boolean
  monthly_budget:number

  }> {
    
  }