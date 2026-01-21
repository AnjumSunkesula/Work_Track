import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthCard from "./AuthCard";
import AuthTabs from "./AuthTabs";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-white/20 px-4 py-3 text-white placeholder-white/60 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-white py-3 font-semibold text-black hover:bg-white/90"
        >
          Login
        </button>
      </form>
    </AuthCard>
  );
}
