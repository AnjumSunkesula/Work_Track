import PriorityBadge from "../components/PriorityBadge";
import { useState,useEffect } from "react";

function buildActivity(task) {
  if (task.isCompleted) {
    return {
      text: `Completed "${task.title}"`,
      time: task.createdAt,
      type: "completed",
    };
  }

  return {
    text: `Created "${task.title}"`,
    time: task.createdAt,
    type: "created",
  };
}


export default function Dashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const [statsRes, tasksRes] = await Promise.all([
        fetch("https://localhost:7200/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("https://localhost:7200/api/dashboard/recent-tasks", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!statsRes.ok || !tasksRes.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const statsData = await statsRes.json();
      const tasksData = await tasksRes.json();

      setStats(statsData);
      setRecentTasks(tasksData);
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

            {recentTasks.length === 0 ? (
              <p className="text-sm text-slate-500">
                No tasks yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {recentTasks.map(task => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm ${
                          task.isCompleted
                            ? "line-through text-slate-400"
                            : "text-brand-dark"
                        }`}
                      >
                        {task.title}
                      </span>

                      {task.isCompleted && <span>✅</span>}
                    </div>

                    <PriorityBadge level={task.priority} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="font-medium text-brand-dark mb-4">Activity</h2>
            {recentTasks.length === 0 ? (
              <p className="text-sm text-slate-500">
                No recent activity.
              </p>
            ) : (
              <ul className="space-y-4">
                {recentTasks.map(task => {
                  const activity = buildActivity(task);

                  return (
                    <li
                      key={task.id}
                      className="flex items-start gap-3"
                    >
                      {/* Icon */}
                      <span className={`mt-1 text-sm ${
                        activity.type === "completed"
                          ? "text-green-500"
                          : "text-brand-dark"
                      }`}>
                        {activity.type === "completed" ? "✔" : "➕"}
                      </span>

                      {/* Text */}
                      <div className="flex-1">
                        <p className="text-sm text-brand-dark">
                          {activity.text}
                        </p>

                        <p className="text-xs text-slate-400 mt-0.5">
                          {new Date(activity.time).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
