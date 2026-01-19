import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import LogoutButton from "../components/LogoutButton";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-brand-bg">
      <Sidebar />

      <main className="flex-1 p-10">
        <div className="flex justify-end mb-6">
          <LogoutButton />
        </div>

        <Outlet />
      </main>
    </div>
  );
}
