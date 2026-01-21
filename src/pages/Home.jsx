import { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import AuthGlassCard from "../components/auth/AuthGlassCard";

export default function Home() {
  const [mode, setMode] = useState("login");

  return (
    <AuthGlassCard>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setMode("login")}
          className={`px-4 py-2 text-sm font-medium rounded-l-lg
            ${mode === "login"
              ? "bg-white text-brand-dark"
              : "bg-white/30 text-white"}
          `}
        >
          Login
        </button>

        <button
          onClick={() => setMode("register")}
          className={`px-4 py-2 text-sm font-medium rounded-r-lg
            ${mode === "register"
              ? "bg-white text-brand-dark"
              : "bg-white/30 text-white"}
          `}
        >
          Register
        </button>
      </div>

      {mode === "login" ? <Login /> : <Register />}
    </AuthGlassCard>
  );
}