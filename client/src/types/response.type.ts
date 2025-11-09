export interface Response<T> {
  data: T;
  meta: Meta;
  error?: Error;
  success: boolean;
  message: string;
  status_code: number;
}

export type Error = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type Meta = {
  limit: number;
  page: number;
  total_results: number;
  total: number;
};
