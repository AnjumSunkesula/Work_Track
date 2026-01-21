export default function AuthGlassCard({ children }) {
  return (
    <div
      className="
        w-full max-w-md
        rounded-2xl
        bg-white/20
        backdrop-blur-xl
        border border-white/30
        shadow-2xl
        p-8
      "
    >
      {children}
    </div>
  );
}