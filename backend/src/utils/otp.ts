import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  logger: true,
  debug: true,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SendGrid connection failed:", error);
  } else {
    console.log("SendGrid is ready to send emails");
  }
});

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
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.info(`OTP sent to ${email}`);
  } catch (error) {
    console.error(`Error sending OTP to ${email}:`, error);
    throw new Error("Failed to send OTP");
  }
};