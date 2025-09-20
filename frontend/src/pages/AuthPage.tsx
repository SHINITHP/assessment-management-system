import React from "react";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { LoginPage } from "@/components/login";
import { RegisterPage } from "@/components/register";

interface AuthModeProps {
  authMode: "SignIn" | "SignUp";
  onClose: () => void;
}
const AuthPage = ({ authMode, onClose }: AuthModeProps) => {
  return (
    <div className="fixed z-50 inset-0 bg-black/80 flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          initial={{ y: "-100vh", opacity: 0 }} // Slide in from left
          animate={{ y: "0vh", opacity: 1 }} // Settle at center
          exit={{ y: "-100vh", opacity: 0 }} // Slide out to left
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full h-[98%] md:w-[65%] lg:w-1/2 xl:w-1/3 border rounded-sm bg-white m-0 p-0 relative border-r flex flex-col items-center shadow-2xl overflow-y-auto`}
        >
          <button
            className="absolute top-0 right-0 w-14 h-14 flex justify-center items-center cursor-pointer"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <X className="h-7 w-7 text-black" />
          </button>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="w-full mt-10 text-center text-3xl font-bold">
              {authMode === "SignIn" ? "Welcome Back" : "Create an Account"}
            </h1>

            {authMode === "SignIn" ? <LoginPage /> : <RegisterPage />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
