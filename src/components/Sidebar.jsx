import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import {X} from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { ListTodo } from "lucide-react";
import { UsersRound } from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {

  const linkBase = "block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200";
  const activeClass = "bg-brand-accent text-brand-primary";
  const inactiveClass = "text-white hover:text-brand-dark hover:bg-slate-100";

   return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-64 bg-brand-dark text-white z-40
        transform transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-wide">WorkTrack</h1>

        <button
          onClick={toggleSidebar}
          className="text-white text-lg"
          aria-label="Close sidebar"
        >
          <X />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-6 space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkBase} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <div className="flex items-center gap-2">
            <span><LayoutDashboard /></span>
            <span>Dashboard</span>
          </div>
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <div className="flex items-center gap-2">
            <span><ListTodo /></span>
            <span>Tasks</span>
          </div>
        </NavLink>

        <NavLink
          to="/calendar"
          className={`${linkBase} ${inactiveClass}`}
        >
          <div className="flex items-center gap-2">
            <span><CalendarDays /></span>
            <span>Calendar</span>
          </div>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-white/10">
        <LogoutButton />
      </div>
    </aside>
  );
}