import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from './pages/Register';
import Login from './pages/login';
import ProtectedRoute from "./components/ProtectedRoute";
// import './index.css'
import LogoutButton from "./components/LogoutButton";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";

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
                <Tasks/>
                <LogoutButton/>
                <Dashboard/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App