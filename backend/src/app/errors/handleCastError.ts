import { TErrorInterface } from "../types/error.type";

export const HandleCastError = (err: any): TErrorInterface => {
  const statusCode = 400;
  const errorMessages = [
    {
      path: err.path || "",
      message: err.message || "",
    },
  ];

  return {
    statusCode,
    message: err?.message,
    errorMessages,
  };
};
