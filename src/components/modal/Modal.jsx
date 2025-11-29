import { X } from "lucide-react";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="
          bg-white p-6 rounded-lg shadow-lg relative
          w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 font-extrabold"
          onClick={onClose}
        >
          <X size={18} />
        </button>
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
}
