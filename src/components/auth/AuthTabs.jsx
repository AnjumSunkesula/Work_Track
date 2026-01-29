import { useLocation, useNavigate } from "react-router-dom";

export default function AuthTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";

  return (
    <div className="mb-6 flex rounded-xl bg-white/30 p-1 backdrop-blur-md">
      <button
        onClick={() => navigate("/login")}
        className={`
          flex-1 rounded-lg py-2 text-sm font-semibold transition-all
          ${
            isLogin
              ? "bg-white text-brand-dark shadow"
              : "text-zinc-500 hover:bg-white/20"
          }
        `}
      >
        Log In
      </button>

      <button
        onClick={() => navigate("/register")}
        className={`
          flex-1 rounded-lg py-2 text-sm font-semibold transition-all
          ${
            !isLogin
              ? "bg-white text-brand-dark shadow"
              : "text-zinc-500 hover:bg-white/20"
          }
        `}
      >
        Sign Up
      </button>
    </div>
  );
}
