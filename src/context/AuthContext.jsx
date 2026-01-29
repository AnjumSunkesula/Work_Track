import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, getMe } from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore auth on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);

    getMe(storedToken)
      .then((data) => {
        setUser({
          id: data.id,
          email: data.email,
        });
      })
      .catch(() => {
        logout();
      })
      .finally(() => setLoading(false));
  }, []);


  // Login handler
  const login = async (email, password) => {
    try{
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      setToken(data.token);  // Save token
      setUser(data.user);
      navigate("/");
    } catch (err) {
      throw err; // Rethrow error to be handled in the component
    }
  };

  //  Register handler
  const register = async (fullName, email, password) => {
    await registerUser({
      fullName,
      email,
      password,
      role: "User",
    });

    navigate("/login");
  };



  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  const value = {
    user,
    token,
    login,
    register,
    loading,
    isAuthenticated: !!user,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const isValidEmail = (email) =>  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function getPasswordStrength(password) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[@_!#$%^&*]/.test(password),
  };
}


export function useAuth() {
  const ctx = useContext(AuthContext);
  if(!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}