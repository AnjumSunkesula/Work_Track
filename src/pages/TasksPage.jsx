import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasks, createTask, completeTask, deleteTask } from "../api/tasks";

export default function TasksPage() {
  const { token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    getTasks(token)
      .then(setTasks)
      .catch((err) => {
        console.error(err);
        logout();
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleCreate = async () => {
    if (!title.trim()) return;

    const newTask = await createTask(title, token);
    setTasks((prev) => [...prev, newTask]);
    setTitle("");
  };

  const handleComplete = async (id) => {
    const updated = await completeTask(id, token);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updated : t))
    );
  };

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h2>My Tasks</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={handleCreate}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.isCompleted ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>

            {!task.isCompleted && (
              <button onClick={() => handleComplete(task.id)}>
                ✔
              </button>
            )}

            <button onClick={() => handleDelete(task.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}