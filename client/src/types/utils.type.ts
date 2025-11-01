import type { SVGProps } from "react";

export type LucideIcon = React.FC<SVGProps<SVGSVGElement>>;
export interface Route {
  label: string;
  path: string;
  icon: LucideIcon;
  children?: Route[];
}

export interface MetaData {
  label: string;
  icon: LucideIcon;
  value: string | number;
  isCurrency?: boolean;
  isPercentage: boolean;
}
