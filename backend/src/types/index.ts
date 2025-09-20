export interface IUser {
  fullName: string;
  email: string;
  password: string;
  createdAt?: Date;
  status: 'pending' | 'verified';
  comparePassword(userPassword: string): Promise<boolean>;
}

export interface ITokenPayload {
  userId: string;
  email: string;
}

export interface ISignUpVerifyOTPPayload {
  email: string;
  otp: string;
  token: string;
}
