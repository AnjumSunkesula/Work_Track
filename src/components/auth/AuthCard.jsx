import { useOutletContext } from "react-router-dom";

export default function AuthCard({ children, className="" }) {
  const { setFocused } = useOutletContext();
  return (
    <div 
      onFocus={() => setFocused?.(true)}
      onBlur={() => setFocused?.(false)}
      className={`w-full max-w-xl rounded-2xl bg-brand-secondary/20 backdrop-blur-xl border border-white/30 shadow-2xl p-8 md:p-10 text-white ${className}`}>
      {children}
    </div>
  );
}