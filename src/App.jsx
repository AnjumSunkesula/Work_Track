import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import Register from './pages/Register';
// import Login from './pages/login';
import ProtectedRoute from "./components/ProtectedRoute";
import LogoutButton from "./components/LogoutButton";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import HomeLayout from "./layouts/HomeLayout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
           <Route element={<HomeLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout/>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App