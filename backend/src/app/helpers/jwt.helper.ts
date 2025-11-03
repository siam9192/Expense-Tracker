import jwt from "jsonwebtoken";

export const generateJwtToken = (
  payload: any,
  secret: string,
  expiresIn: string,
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expiresIn as any,
  });

  return token;
};

export const verifyJwtToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as any;
};
