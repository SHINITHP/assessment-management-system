import { HeroSection } from "@/components/hero-section";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthPage from "./AuthPage";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authModeParam = searchParams.get("authMode");

  const authMode: "SignIn" | "SignUp" =
    authModeParam === "SignIn"
      ? "SignIn"
      : authModeParam === "SignUp"
      ? "SignUp"
      : "SignIn"; // default

  const handleCloseModal = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <HeroSection />;
       {authModeParam && (
        <AuthPage authMode={authMode || "login"} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Home;
