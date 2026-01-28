import { useState } from "react";
import { useAuth, isValidEmail } from "../../context/AuthContext";
import AuthCard from "./AuthCard";
import AuthTabs from "./AuthTabs";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <h2 className="mb-4 text-xl font-semibold">Welcome back</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none"
        />
        {email && !isValidEmail(email) && (
          <p style={{ color: "red" }}>Enter a valid email</p>
        )}

        {emailError && (
          <p style={{ color: "red" }}>{emailError}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none"
        />
        {password && password.length < 6 && (
          <p style={{ color: "red" }}>Password must be at least 6 characters</p>
        )}

        {passwordError && (
          <p style={{ color: "red" }}>{passwordError}</p>
        )}

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full rounded-lg bg-white py-3 font-semibold text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </form>
    </AuthCard>
  );
}