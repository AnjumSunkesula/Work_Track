import { useEffect, useState } from "react";
import { getTasks, createTask, completeTask, deleteTask, updateTaskPriority } from "../api/tasks";
import { useAuth } from "../context/AuthContext";
import { CheckCircle2, Trash2 } from "lucide-react";
import PriorityBadge from "../components/PriorityBadge";

function getRelativeTime(utcDateString) {
  if (!utcDateString) return "";
  const date = new Date(utcDateString + "Z");
  return date.toLocaleString();
}

export default function Tasks() {
  const { token } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [filter,setFilter] = useState("all");
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [priority, setPriority] = useState("MED");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

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

    if (!title.trim()) return;
    
    try {
      const newTask = await createTask(title, token, priority);
      setTasks([...tasks, newTask]);
      setTitle("");
      setPriority("MED");
    } catch {
      setError("Failed to add task");
    }
  };

  // edit/update priority badge
  // const handlePriorityChange = async (id, newPriority) => {
  //   try {
  //     const updated = await updateTaskPriority(id, newPriority, token);
  //     setTasks(tasks.map(t => (t.id === id ? updated : t)));
  //   } catch {
  //     setError("Failed to update priority");
  //   }
  // };


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
    if (filter === "active" && t.isCompleted) return false;
    if (filter === "completed" && !t.isCompleted) return false;
    if (priorityFilter !== "ALL" && t.priority !== priorityFilter) return false;
    return true;
  });

  const priorityOrder = { HIGH: 1, MED: 2, LOW: 3 };

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

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
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-lg border border-slate-300 px-2 py-2 text-sm bg-white focus:outline-none"
        >
          <option value="LOW">LOW</option>
          <option value="MED">MED</option>
          <option value="HIGH">HIGH</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-lg border px-2 py-1 text-sm"
        >
          <option value="ALL">All priorities</option>
          <option value="LOW">Low</option>
          <option value="MED">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <button
          disabled={!title.trim()}
          className="p-2 rounded-lg bg-brand-accent text-brand-dark font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
        {sortedTasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-4 rounded-xl border transition
              ${task.isCompleted
                ? "bg-slate-50 border-slate-200"
                : "bg-white border-slate-200 hover:shadow-sm"
              }`}
          >
            <div className="flex items-center gap-3">
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
                <div className="flex justify-between ">
                  <p
                    className={`text-sm font-medium
                      ${task.isCompleted
                        ? "line-through text-slate-400"
                        : "text-brand-dark"
                      }`}
                  >
                    {task.title}
                  </p>


                  <PriorityBadge level={task.priority} />

                </div>

                <p className="text-xs text-slate-400 mt-1">
                  Created: {getRelativeTime(task.createdAt)}
                  {task.isCompleted && (
                    <> · Completed: {getRelativeTime(task.completedAt)}</>
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