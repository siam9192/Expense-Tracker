export interface AppSettings {
  theme: AppTheme;
  language: AppLanguage;
}

export enum AppTheme {
  LIGHT = "light",
  DARK = "dark",
}

export enum AppLanguage {
  English = "en",
  Bangla = "bn",
  Spanish = "es",
}
