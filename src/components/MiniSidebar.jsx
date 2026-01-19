import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import {X} from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { ListTodo } from "lucide-react";
import { UsersRound } from "lucide-react";

export default function MiniSidebar({ isOpen, toggle }) {
  const iconClass = "w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-white hover:text-brand-dark transition";

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-brand-dark flex flex-col items-center py-4 z-40">
      
      <button
        onClick={toggle}
        className={`mb-6 text-white text-xl transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45" : "rotate-0" }`}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <nav className="flex flex-col gap-4">
        <NavLink to="/" end className={iconClass}><LayoutDashboard /></NavLink>
        <NavLink to="/tasks" className={iconClass}><ListTodo /></NavLink>
        <NavLink to="/calendar" className={iconClass}><CalendarDays /></NavLink>
        <NavLink to="/team" className={iconClass}><UsersRound /></NavLink>
      </nav>
    </aside>
  );
}
