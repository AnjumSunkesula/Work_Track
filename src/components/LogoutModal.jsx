import { X } from "lucide-react";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      
      {/* Modal */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-brand-dark">
            Confirm Logout
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-brand-dark transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Message */}
        <p className="text-sm text-slate-500 mb-6">
          Are you sure you want to Logout?
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium border bg-brand-dark hover:bg-green-700 text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
