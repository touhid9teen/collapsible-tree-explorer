import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../Button";

export default function DynamicModal({
  type,
  isOpen,
  onClose,
  onSubmit,
  initialKey = "",
  initialValue = "",
  nodeKey = "",
}) {
  const [keyInput, setKeyInput] = useState(initialKey);
  const [valueInput, setValueInput] = useState(initialValue);

  useEffect(() => {
    setKeyInput(initialKey);
    setValueInput(initialValue);
  }, [initialKey, initialValue, type, isOpen]);

  const handleSubmit = () => {
    if (type === "import") {
      try {
        const parsed = JSON.parse(valueInput);
        onSubmit(null, parsed);
        setValueInput("");
        onClose();
      } catch {
        alert("Invalid JSON");
      }
    } else if (type === "add" || type === "update") {
      if (!keyInput) return alert("Key cannot be empty");
      if (!valueInput) return alert("Value cannot be empty");
      onSubmit(keyInput, valueInput);
      setKeyInput("");
      setValueInput("");
      onClose();
    } else if (type === "delete") {
      onSubmit();
      onClose();
    }
  };

  if (!isOpen) return null;

  const titles = {
    import: "Import JSON",
    add: "Add New Node",
    update: "Update Node",
    delete: "Confirm Delete",
  };

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
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-bold mb-4">{titles[type]}</h2>

        {type === "import" && (
          <textarea
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            className="
              w-full h-40 sm:h-48 md:h-56 lg:h-64 p-3 border border-gray-300 rounded font-mono text-sm mb-4 resize-none
              focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors
            "
            placeholder="Paste JSON here..."
          />
        )}

        {(type === "add" || type === "update") && (
          <>
            <input
              type="text"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="
                w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors
              "
              placeholder={
                type === "add" ? "Enter key" : `Update key "${nodeKey}"`
              }
            />
            <input
              type="text"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              className="
                w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors
              "
              placeholder="Enter value"
            />
          </>
        )}

        {type === "delete" && (
          <p>Are you sure you want to delete the node "{nodeKey}"?</p>
        )}

        <div className="flex gap-2 justify-end">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            {type === "delete" ? "Delete" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
