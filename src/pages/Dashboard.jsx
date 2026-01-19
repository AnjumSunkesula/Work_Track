import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import PriorityBadge from "../components/PriorityBadge";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-brand-bg">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold text-brand-dark">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Tasks" value="24" />
          <StatCard title="Completed" value="15" />
          <StatCard title="Pending" value="9" />
        </div>

        {/* Placeholder sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-accent">
            <h2 className="font-medium text-brand-dark mb-4">
              Recent Tasks
            </h2>

            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span className="text-sm text-brand-dark">
                  Design dashboard UI
                </span>
                <PriorityBadge level="HIGH" />
              </li>

              <li className="flex items-center justify-between">
                <span className="text-sm text-brand-dark">
                  Fix Tailwind setup
                </span>
                <PriorityBadge level="MED" />
              </li>

              <li className="flex items-center justify-between">
                <span className="text-sm text-brand-dark">
                  Refactor task list
                </span>
                <PriorityBadge level="LOW" />
              </li>
            </ul>
          </div>


          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="font-medium text-brand-dark mb-4">Activity</h2>
            <p className="text-slate-500 text-sm">
              Activity feed UI placeholder.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}