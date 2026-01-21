import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthCard from "./AuthCard";
import AuthTabs from "./AuthTabs";

export default function Register() {
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(fullName, email, password);
  };

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

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-white/60"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-white/60"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-white py-3 font-semibold text-black hover:bg-white/90"
        >
          Create Account
        </button>
      </form>
    </AuthCard>
  );
}
