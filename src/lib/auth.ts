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

export const createJwtToken2 = (_id: string) => {
  const token = jwt.sign(
    {
      _id: _id,
    },
    keyCredentials.secretKey
  );

  return token;
};

export const decodeJwtToken = (_token: string) => {
  const decodeResult: any = jwt.verify(_token, keyCredentials.secretKey, (err, decoded) => {
    if (err) {
      return {
        status: "error",
        message: err.message,
      };
    } else {
      return {
        status: "ok",
        decoded: decoded,
      };
    }
  });

  return decodeResult;
};
