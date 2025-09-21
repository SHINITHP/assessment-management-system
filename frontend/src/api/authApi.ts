import {
  IAuthResponse,
  ISignInPayload,
  ISignUpPayload,
  IverifyOtpPayload,
  ISignUpResponse,
} from "@/types";
import api from "./axios";
import { AxiosResponse } from "axios";

export const signUp = async (
  payload: ISignUpPayload
): Promise<AxiosResponse<ISignUpResponse>> => {
  const response = await api.post<ISignUpResponse>("/auth/sign-up", payload);

  sessionStorage.setItem("email", response.data.user.email);

  return response;
};

// export const resendOtp = async () => {

// }

export const signIn = async (
  payload: ISignInPayload
): Promise<AxiosResponse<IAuthResponse>> => {
  const response = await api.post<IAuthResponse>("/auth/sign-in", payload);

  //save accesstoken to localstorage
  localStorage.setItem("accessToken", response.data.accessToken);

  return response;
};
export const verifyOTP = async (
  payload: IverifyOtpPayload
): Promise<AxiosResponse<IAuthResponse>> => {
  const response = await api.post<IAuthResponse>("/auth/verify-otp", payload);

  //save accesstoken to localstorage
  localStorage.setItem("accessToken", response.data.accessToken);

  return response;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
};
