import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
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

export interface Params {
  [key: string]: string | number;
}

export type UseQueryResult<T> = {
  data?: T;
  error?: FetchBaseQueryError | SerializedError;
  isUninitialized: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
  currentData?: T;
  fulfilledTimeStamp?: number;
};
