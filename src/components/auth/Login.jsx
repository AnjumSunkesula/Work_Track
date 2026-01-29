import { useState } from "react";
import { useAuth, isValidEmail } from "../../context/AuthContext";
import AuthCard from "./AuthCard";
import AuthTabs from "./AuthTabs";
import { Eye, EyeClosed, Mail} from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    try{
      await login(email, password);
    } catch (err) {
      if (err.code === "INVALID_EMAIL") {
        setEmailError("This email is not registered");
      } else if (err.code === "INVALID_PASSWORD") {
        setPasswordError("Password is incorrect");
      } else {
        setPasswordError("Login failed. Try again.");
      }
    }
  };

  const isFormValid = isValidEmail(email) && password.length >= 6;


  return (
    <AuthCard>
      <AuthTabs />
      <h2 className="mb-6 text-xl text-center text-brand-bg font-semibold">Welcome back</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-[#9CAB84]/60 rounded-lg bg-white px-4 py-3 text-[#4F5D3A] placeholder-text-[#7B8660] focus:outline-none focus:ring-2 focus:ring-[#C5D89D] focus:border-[#9CAB84]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark"> {<Mail />} </div>
        </div>
        {email && !isValidEmail(email) && (
          <p style={{ color: "red" }}>Enter a valid email</p>
        )}

        {emailError && (
          <p style={{ color: "red" }}>{emailError}</p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-[#9CAB84]/60 rounded-lg bg-white px-4 py-3 text-[#4F5D3A] placeholder-text-[#7B8660] focus:outline-none focus:ring-2 focus:ring-[#C5D89D] focus:border-[#9CAB84]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark"
          >
            {showPassword ? <EyeClosed /> : <Eye />}
          </button>
        </div>
        {password && password.length < 6 && (
          <p style={{ color: "red" }}>Password must be at least 6 characters</p>
        )}

        {passwordError && (
          <p style={{ color: "red" }}>{passwordError}</p>
        )}

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full rounded-lg bg-brand-bg py-3 font-semibold text-brand-dark hover:bg-[#F6FOD7]/90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F6FOD7]/80  transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
        >
          Login
        </button>
      </form>
    </AuthCard>
  );
}