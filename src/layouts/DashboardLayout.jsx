import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MiniSidebar from "../components/MiniSidebar";
import { useState } from "react";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-brand-bg relative">

      {!sidebarOpen && (
        <MiniSidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(true)} />
      )}

      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(false)} 
      />

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        />
      )}

      <main className={`flex-1 transition-all duration-300 p-10
          ${sidebarOpen ? "ml-64" : "ml-16"}
        `}>
        <Outlet />
      </main>
    </div>
  );
}
