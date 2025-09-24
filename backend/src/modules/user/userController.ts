import { Request, Response } from "express";
import { User } from "./userModel";
import {
  createOTPToken,
  generateOTP,
  sendOTP,
  verifyOTPToken,
} from "../../utils/otp";
import {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  verifyJWTToken,
} from "../../utils/generateTokens";

export const signUp = async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body;
  try {
    // check if the user is already exist or not
    const isUserExist = await User.findOne({ email }).select("-password");
    if (isUserExist)
      return res.status(409).json({ message: "User already exists" });

    const otp = generateOTP();
    const token = createOTPToken(email, otp);

    await sendOTP(email, otp, token);

    const user = new User({ fullName, email, password, status: "pending" });
    await user.save();

    res.status(200).json({
      message: "OTP sent. Please verify to continue.",
      user: { email, token },
    });
  } catch (error: any) {
    console.error(error);
  }
};

export const verifySignUpOTP = async (req: Request, res: Response) => {
  const { email, otp, token } = req.body;
  try {
    const data = verifyOTPToken(token, otp);
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (email !== data.email) {
      console.warn(`Email mismatch for OTP verification: ${data.email}`);
    }

    const user = await User.findOne({ email: data.email }).select("-password");
    if (!user || user.status !== "pending") {
      console.warn(`Invalid user or already verified: ${data.email}`);
      return res
        .status(400)
        .json({ message: "Invalid user or already verified" });
    }

    user.status = "verified";
    await user.save();

    // accessToken
    const { accessToken, refreshToken } = generateTokens({
      userId: user._id.toString(),
      email: user.email,
    });

    // refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "User verified successfully",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error(error);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Verify refresh token
    const decoded = verifyJWTToken(token);
    if (!decoded) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    // verify user exist or not
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new access token
    const accessToken = generateAccessToken({
      userId: decoded.userId,
      email: decoded.email,
    });

    const timeLeft = decoded.exp * 1000 - Date.now();
    let newRefreshToken = token;
    if (timeLeft < 24 * 60 * 60 * 1000) {
      newRefreshToken = generateRefreshToken({
        userId: decoded.userId,
        email: decoded.email,
      });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    // Send new access token
    return res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.warn(`Login failed - User not found: ${email}`);
      return res.status(400).json({ message: "User not Found." });
    }

    //compare hashed password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      console.warn(`Login failed - Incorrect password for user: ${email}`);
      return res.status(400).json({ message: "Incorrect password." });
    }

    // accessToken
    const { accessToken, refreshToken } = generateTokens({
      userId: user._id.toString(),
      email: user.email,
    });

    // refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "User Logged successfully",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error(error);
  }
};
