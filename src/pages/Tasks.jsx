import { useEffect, useState } from "react";
import { getTasks, createTask, completeTask, deleteTask } from "../api/tasks";
import { useAuth } from "../context/AuthContext";
import { CheckCircle2, Trash2 } from "lucide-react";

function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString();
}

export default function Tasks() {
  const { token } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [filter,setFilter] = useState("all");
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  const trimmedTitle = title.trim();

  useEffect(() => {
    if (!token) return;

    setLoadingTasks(true);
    getTasks(token)
      .then(setTasks)
      .catch(() => setError("Failed to load tasks"))
      .finally(() => setLoadingTasks(false));
  }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;
    
    try {
      const newTask = await createTask(title, token);
      setTasks([...tasks, newTask]);
      setTitle("");
    } catch {
      setError("Failed to add task");
    }
  };

  const handleComplete = async (id) => {
    setActionLoading(prev => ({ ...prev, [id]: true }));

    try{
      const updated = await completeTask(id, token);
      setTasks(tasks.map(t => (t.id === id ? updated : t)));

      localStorage.setItem("refreshDashboardStats", Date.now().toString());
    } finally {
      setActionLoading(prev => ({...prev, [id]: false}));
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete the selected task?")
    if (!confirmed) return;

    setActionLoading(prev => ({ ...prev, [id]: true }));

    try {
      await deleteTask(id, token);
      setTasks(tasks.filter(t => t.id !== id));

      localStorage.setItem("refreshDashboardStats", Date.now().toString());
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === "active") return !t.isCompleted;
    if (filter === "completed") return t.isCompleted;
    return true;
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold text-brand-dark mb-10">My Tasks</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "active", "completed"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full text-md font-medium transition
              ${filter === f
                ? "bg-brand-dark text-white"
                : "bg-transparent text-slate-500 hover:bg-brand-secondary hover:text-white"
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Add Task */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-secondary"
        />
        <button
          disabled={!title.trim()}
          className="p-2 rounded-lg bg-brand-accent text-brand-dark font-semibold text-lg disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {/* States */}
      {loadingTasks && (
        <p className="text-sm text-slate-500">Loading tasks…</p>
      )}

      {!loadingTasks && filteredTasks.length === 0 && (
        <p className="text-sm text-slate-500">
          No tasks found.
        </p>
      )}

      {error && (
        <p className="text-sm text-red-500 mb-4">{error}</p>
      )}

      {/* Task list */}
      <div className="space-y-3">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-4 rounded-xl border transition
              ${task.isCompleted
                ? "bg-slate-50 border-slate-200"
                : "bg-white border-slate-200 hover:shadow-sm"
              }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => handleComplete(task.id)}
                disabled={task.isCompleted}
                className={`mt-1
                  ${task.isCompleted
                    ? "text-green-500"
                    : "text-slate-400 hover:text-green-500"
                  }`}
              >
                <CheckCircle2 size={18} />
              </button>

              <div>
                <p
                  className={`text-sm font-medium
                    ${task.isCompleted
                      ? "line-through text-slate-400"
                      : "text-brand-dark"
                    }`}
                >
                  {task.title}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Created: {formatDate(task.createdAt)}
                  {task.isCompleted && (
                    <> · Completed: {formatDate(task.completedAt)}</>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDelete(task.id)}
              className="text-slate-400 hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}