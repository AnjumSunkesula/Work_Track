export default function AuthCard({ children }) {
  return (
    <div
      className="
        w-full max-w-xl
        rounded-2xl
        bg-white/25
        backdrop-blur-xl
        border border-white/30
        shadow-2xl
        p-8
        text-white
      "
    >
      {children}
    </div>
  );
}
