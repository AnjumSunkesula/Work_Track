import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const linkClass = "block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200";

  const activeClass = "bg-brand-accent text-brand-primary";

  const inactiveClass = "text-white hover:text-brand-dark hover:bg-slate-100";

  return (
    <aside className="w-64 min-h-screen bg-brand-dark text-white px-6 py-8">
      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        WorkTrack
      </h1>

      <nav className="space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Tasks
        </NavLink>

        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `${linkClass} ${inactiveClass}`
          }
        >
          Calendar
        </NavLink>
      </nav>
    </aside>
  );
}