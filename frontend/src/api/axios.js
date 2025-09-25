import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // for using cookies
});
// request interceptor to attach accessToken - no need to attach it everytime
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});
// response interceptor to refresh token on 401 - if any error comes
api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    if (error.response &&
        error.response.status === 401 &&
        !originalRequest._retry) {
        originalRequest.retry = true;
        try {
            // call the refresh token :
            const res = await axios.post("http://localhost:5000/api/auth/refresh-token", {}, { withCredentials: true });
            localStorage.setItem("accessToken", res.data.accessToken);
            originalRequest.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
            return axios(originalRequest);
        }
        catch (error) {
            console.error("Refresh token failed", error);
            window.location.href = "/?authMode=sign-in"; // redirect to login
        }
    }
    return Promise.reject(error);
});
export default api;
