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

  useEffect(() => {
    if (!token) return;

    getTasks(token)
      .then(setTasks)
      .catch(() => setError("Failed to load tasks"));
  }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask(title, token);
      setTasks([...tasks, newTask]);
      setTitle("");
    } catch {
      setError("Failed to add task");
    }
  };

  const handleComplete = async (id) => {
    const updated = await completeTask(id, token);
    setTasks(tasks.map(t => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete the selected task?")
    if (!confirmed) return;

    await deleteTask(id, token);
    setTasks(tasks.filter(t => t.id !== id));
  };

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
        <button>Add</button>
      </form>

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
                disabled={t.isCompleted}
              >
                {t.isCompleted ? "Completed" : "Complete"}
              </button>
            )}
            <button onClick={() => handleDelete(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}