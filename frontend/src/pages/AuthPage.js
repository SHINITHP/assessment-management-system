import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { LoginPage } from "@/components/sign-in";
import { RegisterPage } from "@/components/sign-up";
import { EnterOTPPage } from "@/components/enter-otp";
const AuthPage = ({ authMode, onClose }) => {
    return (_jsx("div", { className: "fixed z-50 inset-0 bg-black/80 flex items-center justify-center", children: _jsx(AnimatePresence, { children: _jsxs(motion.div, { initial: { y: "-100vh", opacity: 0 }, animate: { y: "0vh", opacity: 1 }, exit: { y: "-100vh", opacity: 0 }, transition: { duration: 0.6, ease: "easeOut" }, className: `w-full ${authMode === "verify-otp"
                    ? "sm:w-3/4 justify-center h-full sm:h-1/2"
                    : "h-[98%]"} md:w-[65%] lg:w-1/2 xl:w-1/3 border rounded-sm bg-white m-0 p-0 relative border-r flex flex-col items-center  shadow-2xl overflow-y-auto`, children: [_jsx("button", { className: "absolute top-0 right-0 w-14 h-14 flex justify-center items-center cursor-pointer", onClick: onClose, "aria-label": "Close Modal", children: _jsx(X, { className: "h-7 w-7 text-black" }) }), _jsxs("div", { className: "w-full h-full flex flex-col justify-center items-center", children: [_jsx("h1", { className: "w-full mt-10 text-center text-3xl font-bold", children: authMode === "forgot-password"
                                    ? "Forgot Password"
                                    : authMode === "sign-up"
                                        ? "Create an Account"
                                        : authMode === "verify-otp"
                                            ? "Verify OTP"
                                            : "Welcome Back" }), authMode === "sign-in" && _jsx(LoginPage, {}), authMode === "sign-up" && _jsx(RegisterPage, {}), authMode === "verify-otp" && _jsx(EnterOTPPage, {})] })] }) }) }));
};
export default AuthPage;
