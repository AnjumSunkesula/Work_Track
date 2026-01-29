import { useState } from "react";
import { useAuth, isValidEmail, getPasswordStrength } from "../../context/AuthContext";
import AuthCard from "./AuthCard";
import AuthTabs from "./AuthTabs";
import { User ,Eye, EyeClosed, Mail,CheckCircle, XCircle} from 'lucide-react';


export default function Register() {
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [error, setError] = useState("");
  
  
  const strength = getPasswordStrength(password);
  
  const isStrongPassword =
  strength.length &&
  strength.uppercase &&
  strength.number &&
  strength.special;
  
  const isFormValid = fullName.trim().length >= 3 && isValidEmail(email) && isStrongPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try{
      await register(fullName,email,password,);
    } catch (err) {
      if (err.message.toLowerCase().includes("email")) {
        setError("An account with this email already exists. Please log in.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };



  return (
    <AuthCard>
      <AuthTabs />

      <h2 className="mb-6 text-xl text-center text-brand-bg font-semibold">Create an account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border-[#9CAB84]/60 rounded-lg bg-white px-4 py-3 text-[#4F5D3A] placeholder-text-[#7B8660] focus:outline-none focus:ring-2 focus:ring-[#C5D89D] focus:border-[#9CAB84]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark"> {<User />} </div>
        </div>
        {fullName && fullName.trim().length < 3 && (
          <p style={{ color: "red" }}>Name must be at least 3 characters</p>
        )}

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
        {error && (
          <div style={{ color: "red" }}>
            {error}
          </div>
        )}

        <div className="relative">
          <input
           type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordTouched(true);
            }}
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
        {passwordTouched && (
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex items-center gap-2">
              {strength.length ? (
                <CheckCircle className="text-brand-primary" size={16} />
              ) : (
                <XCircle className="text-red-500" size={16} />
              )}
              <span className={strength.length ? "text-brand-primary" : "text-red-500"}>
                At least 8 characters
              </span>
            </div>

            <div className="flex items-center gap-2">
              {strength.uppercase ? (
                <CheckCircle className="text-brand-primary" size={16} />
              ) : (
                <XCircle className="text-red-500" size={16} />
              )}
              <span className={strength.uppercase ? "text-brand-primary" : "text-red-500"}>
                One uppercase letter
              </span>
            </div>

            <div className="flex items-center gap-2">
              {strength.number ? (
                <CheckCircle className="text-brand-primary" size={16} />
              ) : (
                <XCircle className="text-red-500" size={16} />
              )}
              <span className={strength.number ? "text-brand-primary" : "text-red-500"}>
                One number
              </span>
            </div>

            <div className="flex items-center gap-2">
              {strength.special ? (
                <CheckCircle className="text-brand-primary" size={16} />
              ) : (
                <XCircle className="text-red-500" size={16} />
              )}
              <span className={strength.special ? "text-brand-primary" : "text-red-500"}>
                One special character (@ _ ! #)
              </span>
            </div>
          </div>
        )}


        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full rounded-lg bg-brand-bg py-3 font-semibold text-brand-dark hover:bg-[#F6FOD7]/90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F6FOD7]/80  transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
        >
          Create Account
        </button>
      </form>
    </AuthCard>
  );
}