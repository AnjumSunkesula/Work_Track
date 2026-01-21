import { Outlet } from "react-router-dom";
import LiquidChrome from "../components/background/LiquidChrome";

export default function HomeLayout() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* Liquid Chrome Background */}
      <div className="absolute inset-0 -z-10">
         <LiquidChrome
          baseColor={[0.78, 0.85, 0.62]} // green-ish
          amplitude={0.35}
          speed={0.6}
          interactive={true}
        />
      </div>

      {/* Dark overlay to reduce brightness */}
      <div className="absolute inset-0 bg-black/30 -z-10" />

      {/* Page content (Login / Register) */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}