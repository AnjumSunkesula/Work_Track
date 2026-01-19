import PriorityBadge from "../components/PriorityBadge";
import { useState,useEffect } from "react";

export default function Dashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://localhost:7200/api/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch dashboard stats");
      }

      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // listen for task updates
    const onStorageChange = (e) => {
      if (e.key === "refreshDashboardStats") {
        fetchStats();
      }
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  function Stat({ label, value }) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-3xl font-semibold mt-2 text-brand-dark">
          {value}
        </h3>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-brand-dark">
        Loading dashboard...
      </div>
    );
  }


  return (
    <div className="flex min-h-screen bg-brand-bg">
      <main className="flex-1">
        <h1 className="text-3xl font-semibold text-brand-dark mb-10">Dashboard</h1>

        {/* Loading */}
        {loading && (
          <p className="text-sm text-slate-500">Loading stats...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Stat label="Total Tasks" value={stats.totalTasks} />
            <Stat label="Completed" value={stats.completedTasks} />
            <Stat label="Pending" value={stats.pendingTasks} />
          </div>
        )}

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
