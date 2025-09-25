import api from "./axios";
export const signUp = async (payload) => {
    const response = await api.post("/auth/sign-up", payload);
    sessionStorage.setItem("email", response.data.user.email);
    return response;
};
// export const resendOtp = async () => {
// }
export const signIn = async (payload) => {
    const response = await api.post("/auth/sign-in", payload);
    //save accesstoken to localstorage
    localStorage.setItem("accessToken", response.data.accessToken);
    return response;
};
export const verifyOTP = async (payload) => {
    const response = await api.post("/auth/verify-otp", payload);
    //save accesstoken to localstorage
    localStorage.setItem("accessToken", response.data.accessToken);
    return response;
};
export const logout = () => {
    localStorage.removeItem("accessToken");
};
