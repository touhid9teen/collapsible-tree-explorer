import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../Button";

export default function DynamicModal({
  type,
  isOpen,
  onClose,
  onSubmit,
  initialKey,
  initialValue,
  nodeKey = "",
}) {
  const [keyInput, setKeyInput] = useState(initialKey);
  const [valueInput, setValueInput] = useState(initialValue);
  const [hasChildren, setHasChildren] = useState(false);

  useEffect(() => {
    setKeyInput(initialKey);
    setValueInput(initialValue);

    const isParentNode = initialValue && typeof initialValue === "object";
    setHasChildren(isParentNode);
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
    } else if (type === "delete" || type === "disable") {
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
    disable: "Confirm Disable",
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="
          bg-white p-6 sm:p-8 rounded-2xl shadow-2xl relative
          w-full max-w-md sm:max-w-lg md:max-w-xl
          ring-1 ring-slate-900/5
          animate-in zoom-in-95 duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-all duration-200"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          {titles[type]}
          {type === 'import' && <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">JSON</span>}
        </h2>

        {type === "import" && (
          <textarea
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            className="
              w-full h-48 sm:h-56 md:h-64 p-4 border border-slate-300 rounded-xl font-mono text-sm mb-4 resize-none
              focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200
              placeholder:text-slate-400 text-slate-700
              bg-white
              custom-scrollbar shadow-sm
            "
            placeholder="Paste your JSON here..."
            spellCheck={false}
          />
        )}

        {(type === "add" || type === "update") && (
          <>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Key Name</label>
                <input
                  type="text"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  className="
                    w-full px-4 py-2.5 border border-slate-300 rounded-lg
                    focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200
                    bg-white text-slate-900 font-medium placeholder:text-slate-400 shadow-sm
                  "
                  placeholder={
                    type === "add" ? "e.g., user_profile" : `Update key "${nodeKey}"`
                  }
                />
              </div>
              
              {!hasChildren && (
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1.5">Value</label>
                  <input
                    type="text"
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                    className="
                      w-full px-4 py-2.5 border border-slate-300 rounded-lg
                      focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200
                      bg-white text-slate-900 placeholder:text-slate-400 shadow-sm
                    "
                    placeholder="e.g., John Doe"
                  />
                </div>
              )}
            </div>
          </>
        )}

        {(type === "delete" || type === "disable") && (
          <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6 flex items-start gap-4">
            <div className={`p-2 rounded-full shrink-0 ${type === 'delete' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
              <X size={20} /> {/* We could use AlertTriangle if imported, but X is okay or we can just skip icon */}
            </div>
            <div>
               <h3 className={`text-sm font-bold ${type === 'delete' ? 'text-red-800' : 'text-amber-800'}`}>
                 {type === 'delete' ? 'Delete Node' : 'Disable Node'}
               </h3>
               <p className="text-sm text-slate-600 mt-1">
                Are you sure you want to <strong>{type}</strong> the node <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">{nodeKey}</span>?
                {type === 'delete' && " This action cannot be undone."}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end pt-2">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant={type === "delete" || type === "disable" ? "danger" : "primary"}
          >
            {type === "delete"
              ? "Delete"
              : type === "disable"
              ? "Disable"
              : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
