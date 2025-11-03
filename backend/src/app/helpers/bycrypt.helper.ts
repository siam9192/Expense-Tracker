import bcrypt from "bcrypt";

export function encrypt(data: string, round = 10) {
  return bcrypt.hashSync(data, round);
}

export function compare(data: string, encrypted: string) {
  return bcrypt.compare(data, encrypted);
}
