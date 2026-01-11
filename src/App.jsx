import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from './pages/Register';
import Login from './pages/login';
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'
import LogoutButton from "./components/LogoutButton";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <h1>Dashboard</h1>
                <LogoutButton/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App