import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { HeroSection } from "@/components/hero-section";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthPage from "./AuthPage";
const Home = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const authModeParam = searchParams.get("authMode");
    const authMode = authModeParam === "sign-in"
        ? "sign-in"
        : authModeParam === "sign-up"
            ? "sign-up"
            : authModeParam === "forgot-password"
                ? "forgot-password"
                : authModeParam === "verify-otp"
                    ? "verify-otp"
                    : "sign-in";
    const handleCloseModal = () => {
        navigate("/", { replace: true });
    };
    return (_jsxs(_Fragment, { children: [_jsx(HeroSection, {}), authModeParam && (_jsx(AuthPage, { authMode: authMode, onClose: handleCloseModal }))] }));
};
export default Home;
