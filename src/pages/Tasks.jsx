import { useEffect, useState } from "react";
import { getTasks, createTask, completeTask, deleteTask, updateTaskPriority } from "../api/tasks";
import { useAuth } from "../context/AuthContext";
import { CheckCircle2, Trash2, SlidersHorizontal, Plus  } from "lucide-react";
import PriorityBadge from "../components/PriorityBadge";
import { useRef } from "react";


function getRelativeTime(utcDateString) {
  if (!utcDateString) return "";
  const date = new Date(utcDateString + "Z");
  return date.toLocaleString();
}

function groupTasks(tasks) {
  const now = new Date();
  const today = new Date(now.toDateString());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + 7);

  const groups = {
    Today: [],
    Tomorrow: [],
    "This week": [],
  };

  tasks.forEach(task => {
    const date = new Date(
      task.isCompleted && task.completedAt
        ? task.completedAt
        : task.createdAt
    );

    if (date >= today && date < tomorrow) {
      groups.Today.push(task);
    } else if (date >= tomorrow && date < endOfWeek) {
      groups.Tomorrow.push(task);
    } else {
      groups["This week"].push(task);
    }
  });

  return groups;
}

function TaskFilter({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const options = [
    { label: "All Priorities", value: "ALL" },
    { label: "Low", value: "LOW" },
    { label: "Medium", value: "MED" },
    { label: "High", value: "HIGH" },
  ];

  const currentLabel =
    options.find(o => o.value === value)?.label;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          px-3 py-2 rounded-lg 
         text-md text-brand-dark
         transition font-semibold hover:text-white hover:bg-brand-dark"
      >
        <div className="flex gap-2 items-center">
          <SlidersHorizontal />
          {currentLabel}
        </div>
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2 w-44
            bg-white rounded-lg shadow-lg border
            overflow-hidden z-50
          "
        >
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`
                w-full text-left px-3 py-2 text-sm
                hover:bg-brand-secondary hover:text-white
                transition
                ${value === opt.value ? "bg-slate-100 font-medium" : ""}
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}



export default function Tasks() {
  const { token } = useAuth();
  const inputRef = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [filter,setFilter] = useState("all");
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [priority, setPriority] = useState("MED");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");


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
      setDescription("");
    setDueDate("");
    setShowModal(false);
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
    if (!t.title.toLowerCase().includes(search.toLowerCase())) return false;
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

      <div className="flex items-center justify-between mb-6">
  <input
    type="text"
    placeholder="Search tasks..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full max-w-5xl rounded-lg border border-slate-300 px-3 py-2 text-sm
               focus:outline-none focus:ring-1 focus:ring-brand-secondary"
  />

 <div className="flex items-center gap-3 relative">
    <TaskFilter
      value={priorityFilter}
      onChange={setPriorityFilter}
    />

    <button
      onClick={() => setShowModal(true)}
      className="px-4 py-2 rounded-lg bg-brand-accent
                 text-brand-dark font-semibold text-md hover:text-white hover:bg-brand-dark hover:opacity-90"
    >
      <div className="flex gap-2 items-center">
        <Plus />
        New Task
      </div> 
    </button>
  </div>
</div>


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
        {Object.entries(groupTasks(sortedTasks)).map(
  ([group, items]) =>
    items.length > 0 && (
      <div key={group} className="mb-10">
        <h2 className="text-sm font-semibold text-slate-400 mb-4 uppercase">
          {group}
        </h2>

        <div className="space-y-3">
          {items.map(task => (
            <div
              key={task.id}
              className={`
                flex items-center justify-between p-4 rounded-xl border
                transition-all duration-200
                ${
                  task.isCompleted
                    ? "bg-slate-50 border-slate-200 opacity-80"
                    : "bg-white border-slate-200 hover:shadow-md hover:-translate-y-[1px]"
                }
              `}
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                {/* Animated checkbox */}
                <button
                  onClick={() => handleComplete(task.id)}
                  disabled={task.isCompleted || actionLoading[task.id]}
                  className={`
                    w-6 h-6 flex items-center justify-center rounded-full border
                    transition-all duration-300
                    ${
                      task.isCompleted
                        ? "bg-green-500 border-green-500 text-white scale-110"
                        : "border-slate-400 hover:border-green-500 hover:scale-105"
                    }
                  `}
                >
                  {task.isCompleted && <CheckCircle2 size={16} />}
                </button>

                <div>
                  <p
                    className={`text-sm font-medium ${
                      task.isCompleted
                        ? "line-through text-slate-400"
                        : "text-brand-dark"
                    }`}
                  >
                    {task.title}
                  </p>

                  {/* <p className="text-xs text-slate-400 mt-1">
                    Created: {getRelativeTime(task.createdAt)}
                    {task.isCompleted && (
                      <> · Completed: {getRelativeTime(task.completedAt)}</>
                    )}
                  </p> */}
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <PriorityBadge level={task.priority} />

                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
)}

      </div>

      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-brand-dark">
          New task
        </h2>
        <button
          onClick={() => setShowModal(false)}
          className="text-slate-400 hover:text-brand-dark"
        >
          ✕
        </button>
      </div>

      {/* Title */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Name of task"
        className="w-full mb-4 rounded-lg border px-3 py-2 text-sm
                   focus:outline-none focus:ring-1 focus:ring-brand-secondary"
      />

      {/* Priority + Due date */}
      <div className="flex gap-3 mb-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm bg-white"
        >
          <option value="LOW">Low</option>
          <option value="MED">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        />
      </div>

      {/* Description */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={4}
        className="w-full rounded-lg border px-3 py-2 text-sm
                   focus:outline-none focus:ring-1 focus:ring-brand-secondary"
      />

      {/* Footer */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleAdd}
          disabled={!title.trim()}
          className="px-4 py-2 rounded-lg bg-brand-accent
                     text-brand-dark font-semibold
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create task
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}