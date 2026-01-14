import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from './pages/Register';
import Login from './pages/login';
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'
import LogoutButton from "./components/LogoutButton";
import TasksPage from "./pages/TasksPage";
import Tasks from "./pages/Tasks";

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
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App