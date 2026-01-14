import { useEffect, useState } from "react";
import { getTasks, createTask, completeTask, deleteTask } from "../api/tasks";
import { useAuth } from "../context/AuthContext";

export default function Tasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

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
    await deleteTask(id, token);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>My Tasks</h2>

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
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} {t.isCompleted && "✅"}
            {!t.isCompleted && (
              <button onClick={() => handleComplete(t.id)}>Complete</button>
            )}
            <button onClick={() => handleDelete(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}