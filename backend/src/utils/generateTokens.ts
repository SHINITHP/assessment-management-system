import jwt from "jsonwebtoken";
import { ITokenPayload } from "../types";

export interface IDecodedToken extends ITokenPayload {
  iat: number; // issued at (timestamp in seconds)
  exp: number; // expiration timestamp in seconds
}


export const generateAccessToken = (user: ITokenPayload): string => {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "15m" }); // 15 minutes
};

export const generateRefreshToken = (user: ITokenPayload): string => {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "7d" }); // 7 days
};

export const generateTokens = (
  user: ITokenPayload
): { accessToken: string; refreshToken: string } => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
};

export const verifyJWTToken = (token: string): IDecodedToken | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as IDecodedToken;
  } catch (error: any) {
    console.error(`Invalid or expired token: ${error.message}`);
    return null;
  }
};
