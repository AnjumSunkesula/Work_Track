import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl md:grid-cols-2">
      
      {/* LEFT — CONTEXT */}
      <div className="hidden flex-col justify-between p-10 text-white md:flex">
        <div>
          <h1 className="text-3xl font-semibold leading-tight">
            Work smarter. <br /> Stay organised.
          </h1>
          <p className="mt-4 text-white/80">
            Track tasks, manage priorities, and never miss a deadline again.
          </p>
        </div>

        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} Work_Track
        </p>
      </div>

      {/* RIGHT — FORM */}
      <div className="p-8">
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Login
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-400">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-white/20 bg-white/20 px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-white/20 bg-white/20 px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-white/90 py-2 font-semibold text-black hover:bg-white"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-white/80">
          Don’t have an account?{" "}
          <Link to="/register" className="font-medium underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}