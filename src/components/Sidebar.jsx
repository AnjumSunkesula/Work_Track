export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-brand-dark text-white px-6 py-8">
      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        WorkTrack
      </h1>

      <nav className="space-y-3 text-sm">
        {["Dashboard", "Tasks", "Calendar", "Team", "Settings"].map(item => (
          <div
            key={item}
            className="px-3 py-2 rounded-lg cursor-pointer hover:bg-brand-secondary/40 transition"
          >
            {item}
          </div>
        ))}
      </nav>
    </aside>
  );
}