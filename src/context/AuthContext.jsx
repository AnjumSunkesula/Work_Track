import { createContext, useContext, useState, useEffect } from "react";
import { getMe } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore auth on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      getMe(storedToken)
        .then(setUser)
        .catch(() => {
          localStorage.clear();
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);



  // Login handler
  const login = async (_, token) => {
    if (!token) return;

    setToken(token);
    localStorage.setItem("token", token);

    const me = await getMe(token);
    setUser(me);
  };


  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);