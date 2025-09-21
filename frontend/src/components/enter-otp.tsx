import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyOTP } from "@/api/authApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export const EnterOTPPage = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (!token) {
      navigate("/authMode=sign-up");
    }
  }, [token, navigate]);

  const handleChange = (val: string, index: number) => {
    if (!/^\d?$/.test(val)) return; // allow only numbers
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleResendOTP = () => {
    try {
    } catch (error) {}
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const joinedOtp = otp.join("");
    if (joinedOtp.length !== 6) return alert("Enter full OTP");
    setIsLoading(true);

    try {
      if (!email || !token) {
        toast.warn("Session expired. Please request OTP again.");
        navigate("/signup");
        return;
      }

      await verifyOTP({
        email,
        otp: joinedOtp,
        token,
      });
      toast.success("User verified successfully");
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Something went wrong. Try again!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col w-full items-center justify-center">
      <p className="text-xs py-2">
        Please enter the OTP sent to your email: <strong>{email}</strong>
      </p>

      <div className="rounded-lg p-8 max-w-md w-full">
        <form onSubmit={handleSubmit} className=" text-center py-4">
          <div className="flex justify-center gap-2 ">
            {otp.map((val, index) => (
              <Input
                key={index}
                value={val}
                maxLength={1}
                inputMode="numeric"
                className="w-12 h-12 text-center text-lg font-bold border border-[#b0afaf] tracking-widest"
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          {/* <div className="w-full text-end pr-8">
            <button
              type="button"
              onClick={handleResendOTP} // implement this function
              className="text-sm text-blue-600 hover:underline focus:outline-none disabled:opacity-50"
              disabled={isResending} // optional loading state
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          </div> */}

          <Button
            type="submit"
            className="w-full h-12 text-md mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </div>
    </section>
  );
};
