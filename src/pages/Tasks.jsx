import React, { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, toggleTask } from "../api/tasks";
import { useAuth } from "../context/AuthContext";
import { Check, CircleCheckBig, Trash2, SlidersHorizontal, Plus  } from "lucide-react";
import PriorityBadge from "../components/PriorityBadge";
import TaskModal from "../components/TaskModal";

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function groupTasksByCreatedAt(tasks) {
  const now = new Date();
  const today = startOfDay(now);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);

  const groups = {
    Today: [],
    Yesterday: [],
    "A Week Ago": [],
    Older: [],
  };

  tasks.forEach(task => {
    const created = startOfDay(new Date(task.createdAt));

    if (created.getTime() === today.getTime()) {
      groups.Today.push(task);
    } else if (created.getTime() === yesterday.getTime()) {
      groups.Yesterday.push(task);
    } else if (created >= last7Days) {
      groups["A Week Ago"].push(task);
    } else {
      groups.Older.push(task);
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

  const currentLabel = options.find(o => o.value === value)?.label;

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

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [filter,setFilter] = useState("all");
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [priority, setPriority] = useState("MED");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  // for future use
  const [actionLoading, setActionLoading] = useState({});
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
      const newTask = await createTask(title, token, priority, description, dueDate);
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

  const handleToggle = async (id) => {
    try {
      const updated = await toggleTask(id, token);

      setTasks(tasks.map(t => (t.id === id ? updated : t)));

      localStorage.setItem("refreshDashboardStats", Date.now().toString());
    } catch {
      setError("Failed to update task");
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
    const title = t.title ?? "";

    if (!title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "active" && t.isCompleted) return false;
    if (filter === "completed" && !t.isCompleted) return false;
    if (priorityFilter !== "ALL" && t.priority !== priorityFilter) return false;
    return true;
  });

  useEffect(() => {
    tasks.forEach(t => {
      if (!t.title) console.warn("Task without title:", t);
    });
  }, [tasks]);


  const priorityOrder = { HIGH: 1, MED: 2, LOW: 3 };

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  const groupedTasks = groupTasksByCreatedAt(sortedTasks);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-brand-dark mb-10">My Tasks</h1>
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-4xl rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-secondary"
        />

        <div className="flex items-center gap-3 relative">
          <TaskFilter
            value={priorityFilter}
            onChange={setPriorityFilter}
          />

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-lg bg-brand-accent text-brand-dark font-semibold text-md hover:text-white hover:bg-brand-dark hover:opacity-90"
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
          No Tasks Found.
        </p>
      )}

      {error && (
        <p className="text-sm text-red-500 mb-4">{error}</p>
      )}

      {/* Task list */}
      {Object.entries(groupedTasks).map(([group, items]) => {
        if (items.length === 0) return null;

        return (
          <div key={group} className="mb-10">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
              <colgroup>
                <col className="w-12" />          
                <col />                          
                <col className="w-32" />          
                <col className="w-40" />          
                <col className="w-20" />          
              </colgroup>

              <thead>
                <tr className="text-xs text-slate-500 border-b bg-slate-50">
                  
                  <th className=" px-4 py-3"></th>
                  {/* GROUP NAME AS COLUMN HEADER */}
                  <th className=" text-left px-4 py-3 font-semibold">
                    {group}
                  </th>
                  <th className="text-center px-4 py-3">Priority</th>
                  <th className="text-center px-4 py-3">Due date</th>
                  <th className="text-center px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map(task => (
                  <React.Fragment key={task.id}>
                    <tr
                      key={task.id}
                      className={`border-b last:border-none transition ${
                        task.isCompleted
                          ? "opacity-70"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      {/* CHECK */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggle(task.id)}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition ${
                            task.isCompleted
                              ? "bg-brand-secondary border-brand-secondary"
                              : "border-slate-300 hover:bg-brand-secondary group"
                          }`}
                        >
                          {task.isCompleted ? (
                            <CircleCheckBig size={16} className="text-white" />
                          ) : (
                            <Check
                              size={14}
                              className="text-slate-400 group-hover:text-white"
                            />
                          )}
                        </button>
                      </td>

                      {/* TASK TITLE */}
                      <td className="px-4 py-3 text-sm">
                        <span
                          onClick={() => {
                            console.log("clicked", task.id,task.description)
                            setExpandedTaskId(
                              expandedTaskId === task.id ? null : task.id
                            );
                          }}
                          className={`
                            cursor-pointer
                            hover:underline
                            ${
                              task.isCompleted
                                ? "line-through text-slate-400"
                                : "text-brand-dark"
                            }
                          `}
                        >
                          {task.title}
                        </span>
                      </td>

                      {/* PRIORITY */}
                      <td className="px-4 py-3 text-center">
                        <PriorityBadge level={task.priority} />
                      </td>

                      {/* DUE DATE */}
                      <td className="px-4 py-3 text-sm text-slate-400 text-center">
                        {task.dueDate || "—"}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                    {expandedTaskId === task.id && (
                      <tr className="bg-slate-50 transition-all duration-200">
                        <td></td>

                        <td colSpan={4} className="px-4 pb-4 text-sm text-slate-600">
                          <div className="border-l-2 border-brand-secondary pl-4">
                            <p className="text-xs uppercase text-slate-400 mb-1">
                              Description
                            </p>
                            <p className="leading-relaxed">
                              {task.description || "No description provided."}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}

      <TaskModal
        isOpen={showModal}
        title={title}
        onClose={() => setShowModal(false)}
        setTitle={setTitle}
        priority={priority}
        setPriority={setPriority}
        description={description}
        setDescription={setDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
        handleAdd={handleAdd}
      />
    </div>
  );
}