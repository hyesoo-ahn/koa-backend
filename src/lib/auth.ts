import jwt from "jsonwebtoken";
import shortid from "shortid";
import { keyCredentials } from "../config/secretkey";
import { SHA512 } from "crypto-js";

export const hash = (password: string): string => {
  return SHA512(password).toString();
};

export const salt = (): string => {
  return shortid.generate();
};

export const createJwtToken = (_id: string) => {
  const token = jwt.sign(
    {
      _id: _id,
    },
    keyCredentials.secretKey,
    { expiresIn: "90d" }
  );

  return token;
};

export const decodeJwtToken = (_token: string) => {
  try {
    const _id: any = jwt.verify(_token, keyCredentials.secretKey, function (err, decoded) {
      if (err) return err;
      else return decoded;
    });

    return _id;
  } catch {
    return false;
  }
};
