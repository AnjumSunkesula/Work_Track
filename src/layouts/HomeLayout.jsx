import { Outlet } from "react-router-dom";
import LiquidChrome from "../components/background/LiquidChrome";

export default function HomeLayout() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      
      {/* Liquid Chrome Background */}
      <div className="absolute inset-0 -z-10">
        <LiquidChrome
          baseColor={[0.7, 0.8, 0.6]} // green > beige balance
          speed={0.4}
          blur={0.35}
        />
      </div>

      {/* Page content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}