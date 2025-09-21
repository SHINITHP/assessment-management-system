import { HeroSection } from "@/components/hero-section";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthPage from "./AuthPage";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  type AuthMode = "sign-in" | "sign-up" | "forgot-password" | "verify-otp";

  const authModeParam = searchParams.get("authMode");

  const authMode: AuthMode =
    authModeParam === "sign-in"
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

  return (
    <>
      <HeroSection />
      {authModeParam && (
        <AuthPage authMode={authMode} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Home;
