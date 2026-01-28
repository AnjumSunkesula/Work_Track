import { useState } from "react";
import { useAuth, isValidEmail } from "../../context/AuthContext";
import AuthCard from "./AuthCard";
import AuthTabs from "./AuthTabs";

export default function Register() {
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try{
      await register({
        fullName,
        email,
        password,
      });
    } catch (err) {
      if (err.message.toLowerCase().includes("email")) {
        setError("An account with this email already exists. Please log in.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  const isFormValid = fullName.trim().length >= 3 && isValidEmail(email) && password.length >= 6;

  return (
    <AuthCard>
      <AuthTabs />

      <h2 className="mb-4 text-xl font-semibold">Create an account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-white/60"
        />
        {fullName && fullName.trim().length < 3 && (
          <p style={{ color: "red" }}>Name must be at least 3 characters</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-white/60"
        />
        {email && !isValidEmail(email) && (
          <p style={{ color: "red" }}>Enter a valid email</p>
        )}
        {error && (
          <div style={{ color: "red" }}>
            {error}
          </div>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-white/60"
        />
        {password && password.length < 6 && (
          <p style={{ color: "red" }}>
            Password must be at least 6 characters
          </p>
        )}

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full rounded-lg bg-white py-3 font-semibold text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </button>
      </form>
    </AuthCard>
  );
}