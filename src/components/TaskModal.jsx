import {X} from "lucide-react";

export default function TaskModal({isOpen, onClose, title, setTitle, priority, setPriority, description, setDescription, dueDate, setDueDate, handleAdd}) {

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}   // ⬅ click outside closes modal
    >
      <form
        onSubmit={handleAdd}
        className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()} // ⬅ prevent close when clicking inside
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-brand-dark">
            New task
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-brand-dark"
          >
            <X/>
          </button>
        </div>

        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name of task"
          className="w-full mb-4 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-secondary"
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
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDueDate(e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm"
          />
          {!dueDate && (
            <p className="text-xs text-red-500 mt-1 text-center flex items-center">
              Due date is required
            </p>
          )}
        </div>

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={4}
          className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-secondary"
        />

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={!title || !title.trim() || !dueDate}
            className="px-4 py-2 rounded-lg bg-brand-accent text-brand-dark font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-dark hover:text-white"
          >
            Create task
          </button>
        </div>
      </form>
    </div>
  );
}