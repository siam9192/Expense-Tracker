export interface Country {
  id: number;
  name: string;
  code: string;
  flag_code: string | null;
  flag_png: string;
  flag_svg: string;
  created_at: Date | string;
  updated_at: Date | string;
}
