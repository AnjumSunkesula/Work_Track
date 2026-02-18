import { NavLink } from "react-router-dom";
import {Menu, X, LayoutDashboard, CalendarDays, ListTodo, UsersRound} from "lucide-react";
import LogoutModal from "./LogoutModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function MiniSidebar({ isOpen, toggle }) {

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/login");
  }
  
  const iconClass = "w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-white hover:text-brand-dark transition";

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-brand-dark flex flex-col items-center py-4 z-40">
      <div className="relative group">
        <button
          onClick={toggle}
          className={`mb-12 text-white text-xl transition-transform duration-300 ease-in-out w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:text-brand-dark delay-75" ${isOpen ? "rotate-45" : "rotate-0" }` }
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Tooltip */}
        <span className="
          absolute left-12 top-5 -translate-y-1/2
          whitespace-nowrap
          bg-white text-brand-dark text-sm font-medium
          px-3 py-1 rounded-md shadow-md
          opacity-0 translate-x-2
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-200
          pointer-events-none"
        >
          Menu
        </span>

      </div>

      <nav className="flex-1 flex flex-col gap-4">
        <SidebarIcon to="/" end label="Dashboard" className={iconClass}><LayoutDashboard /></SidebarIcon>
        <SidebarIcon to="/tasks" label="Tasks" className={iconClass}><ListTodo /></SidebarIcon>
        <SidebarIcon to="/calendar" label="Calendar" className={iconClass}><CalendarDays /></SidebarIcon>
      </nav>

      <div className="relative group">
        <button
          onClick={() => setShowLogoutModal(true)}
          className={iconClass}
        >
          <UsersRound />
        </button>

        <span className="
          absolute left-12 top-1/2 -translate-y-1/2
          whitespace-nowrap
          bg-white text-brand-dark text-sm font-medium tracking-wide
          px-3 py-1 rounded-md shadow-md
          opacity-0 translate-x-2
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-200
          pointer-events-none
        ">
          Logout
        </span>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </aside>
  );
}

/* ---- Helper component ---- */
function SidebarIcon({ to, label, children }) {
  return (
    <NavLink
      to={to}
      className="relative group w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-white hover:text-brand-dark transition delay-75"
    >
      {children}

      {/* Tooltip */}
      <span className="
        absolute left-12 top-1/2 -translate-y-1/2
        whitespace-nowrap
        bg-white text-brand-dark text-sm font-medium tracking-wide
        px-3 py-1 rounded-md shadow-md
        opacity-0 translate-x-2
        group-hover:opacity-100 group-hover:translate-x-0
        transition-all duration-200
        pointer-events-none"
      >
        {label}
      </span>
    </NavLink>
  );
}
