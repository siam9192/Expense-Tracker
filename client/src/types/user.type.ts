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
  OTHER = "OTHER"
}