import jwt from "jsonwebtoken";
import axios from "axios";


export const generateOTP = (): string => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  console.log("OTP-Generated");
  return otp;
};

export const createOTPToken = (email: string, otp: string): string => {
  const payload = { email, otp };
  const token = jwt.sign(payload, process.env.OTP_JWT_SECRET as string, {
    expiresIn: "5m",
  });
  console.log(`Created OTP token for ${email}`);
  return token;
};

export const verifyOTPToken = (
  token: string,
  otp: string
): { email: string } | null => {
  try {
    const decoded = jwt.verify(token, process.env.OTP_JWT_SECRET as string) as {
      email: string;
      otp: string;
    };

    if (decoded.otp !== otp) {
      console.warn(`Invalid OTP for token`);
      return null;
    }

    console.info(`Verified OTP token for ${decoded.email}`);
    return { email: decoded.email };
  } catch (error) {
    console.error("Error verifying OTP token:", error);
    return null;
  }
};

export const sendOTP = async (
  email: string,
  otp: string,
  token: string
): Promise<void> => {
  try {
    const response = await axios.post(
      "https://api.sendgrid.com/v3/mail/send",
      {
        personalizations: [{ to: [{ email }], subject: "Your OTP Code" }],
        from: { email: process.env.EMAIL_USER },
        content: [{ type: "text/html", value: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>` }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.info(`OTP sent to ${email}`);
  } catch (error) {
    console.error(`Error sending OTP to ${email}:`, error);
    throw new Error("Failed to send OTP");
  }
};