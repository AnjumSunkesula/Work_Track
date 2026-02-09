import { Outlet } from "react-router-dom";
import { useState } from "react";
import LiquidChrome from "../components/background/LiquidChrome";

export default function HomeLayout() {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative min-h-[100svh] w-full overflow-x-hidden">
      
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
      <div className="relative z-10 min-h-[100svh] flex flex-col sm:grid sm:grid-cols-2">

        {/* 🔹 MOBILE CONTEXT HEADER */}
        <div
          className={`
            flex sm:hidden
            flex-col items-center text-center
            px-6 mt-10 mb-6
            text-green-950
            transition-all duration-300
            ${focused ? "opacity-60 scale-95" : ""}
          `}
        >
          <h1 className="mb-3 inline-block font-bold text-3xl">
            Work Track
          </h1>

          <h2 className="text-base font-semibold leading-tight">
            Work smarter,<br />
            Stay organised.
          </h2>
        </div>
        
        {/* LEFT SIDE – Marketing */}
        <div className="hidden sm:flex flex-col justify-center px-16 tracking-wide text-green-950">
          <span className="mb-4 inline-block text-lg font-bold">
            Work Track
          </span>

          <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">
            Work smarter,<br />
            Stay organised.
          </h1>

          <p className="mt-4 lg:mt-6 max-w-md text-white/80">
            Track tasks, manage priorities, and never miss a deadline again.
          </p>

          <ul className="mt-4 lg:mt-8 text-sm lg:text-base space-y-3 lg:space-y-4 text-white/80">
            <li>✔ Priority-based task management</li>
            <li>✔ Due-date reminders</li>
            <li>✔ Secure & fast</li>
          </ul>

          <p className="mt-12 text-sm text-white/60">
            © 2026 Work_Track
          </p>
        </div>

        {/* RIGHT SIDE – Auth */}
        <div className="flex items-start sm:items-center justify-center px-6 bg-transparent py-9 md:pb-0">
          <Outlet context={{ setFocused}}/>
        </div>
      </div>
    </div>
  );
}