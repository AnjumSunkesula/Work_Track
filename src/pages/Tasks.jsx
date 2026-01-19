import { useEffect, useState } from "react";
import { getTasks, createTask, completeTask, deleteTask } from "../api/tasks";
import { useAuth } from "../context/AuthContext";

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
      <h2>My Tasks</h2>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>


      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
        />
        <button disabled={!trimmedTitle}>Add</button>
      </form>

      {/*Loading state */}
      {loadingTasks && <p>Loading tasks...</p>}

      {/* Empty state */}
      {!loadingTasks && filteredTasks.length === 0 && (
        <p>No tasks yet. Add your first task</p>
      )}

      {/*task list  */}
      {!loadingTasks && filteredTasks.length > 0 && (
        <ul>
          {tasks.filter(t => {
            if (filter === "active") return !t.isCompleted;
            if (filter === "completed") return t.isCompleted;
            return true;
          })
          .map((t) => (
            <li key={t.id}>
              <div>
                <strong>{t.title}</strong> {t.isCompleted && "✅"}

                <div style={{ fontSize: "0.85rem", color: "#666" }}>
                  <div>Created: {formatDate(t.createdAt)}</div>

                  {t.isCompleted && (
                    <div>Completed: {formatDate(t.completedAt)}</div>
                  )}
                </div>
              </div>

              {!t.isCompleted && (
                <button
                  onClick={() => handleComplete(t.id)}
                  disabled={actionLoading[t.id]}
                >
                  {actionLoading[t.id] ? "Completing..." : "Complete"}
                </button>
              )}

              <button
                onClick={() => handleDelete(t.id)}
                disabled={actionLoading[t.id]}
              >
                {actionLoading[t.id] ? "Deleting..." : "❌"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}