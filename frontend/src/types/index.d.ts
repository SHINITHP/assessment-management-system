export interface ISignUpPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface IverifyOtpPayload {
  email: string;
  otp: string;
  token: string;
}

export interface ISignUpResponse {
  user: {
    email: string;
    token: string;
  };
}

export interface IAuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}
