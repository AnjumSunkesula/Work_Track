import { Outlet } from "react-router-dom";
import LiquidChrome from "../components/background/LiquidChrome";

export default function HomeLayout() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* Liquid Chrome Background */}
      <div className="absolute inset-0 -z-10">
        <LiquidChrome
          baseColor={[0.78, 0.85, 0.62]}
          amplitude={0.35}
          speed={0.6}
          interactive
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 -z-10" />

      {/* Split Layout */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT SIDE – Marketing */}
        <div className="hidden lg:flex flex-col justify-center px-16 text-white">
          <span className="mb-4 inline-block w-fit rounded-full bg-white/10 px-4 py-1 text-sm">
            Now available in beta
          </span>

          <h1 className="text-5xl font-bold leading-tight">
            Work smarter.<br />
            Stay organised.
          </h1>

          <p className="mt-6 max-w-md text-white/80">
            Track tasks, manage priorities, and never miss a deadline again.
          </p>

          <ul className="mt-8 space-y-4 text-white/80">
            <li>✔ Priority-based task management</li>
            <li>✔ Due-date reminders</li>
            <li>✔ Secure & fast</li>
          </ul>

          <p className="mt-12 text-sm text-white/60">
            © 2026 Work_Track
          </p>
        </div>

        {/* RIGHT SIDE – Auth */}
        <div className="flex items-center justify-center px-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}