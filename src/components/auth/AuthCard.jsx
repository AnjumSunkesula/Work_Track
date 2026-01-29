export default function AuthCard({ children, className="" }) {
  return (
    <div className={`w-full max-w-xl rounded-2xl bg-brand-secondary/20 backdrop-blur-xl border border-white/30 shadow-2xl p-8  text-white ${className}`}>
      {children}
    </div>
  );
}