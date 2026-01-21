import { useState, useEffect } from "react";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const { token } = useAuth();

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div>
       <div className="w-full max-w-md rounded-2xl
      bg-white/20 backdrop-blur-xl
      border border-white/30
      shadow-xl p-8">

      <h2 className="text-2xl font-semibold text-white mb-6">
        Welcome back
      </h2>

    </div>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    </div>
  );
}
