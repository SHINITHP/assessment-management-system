import jwt from "jsonwebtoken";
import { ITokenPayload } from "../types";

export const generateAccessToken = (user: ITokenPayload) => {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyJWTToken = (token: string): ITokenPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as ITokenPayload;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
