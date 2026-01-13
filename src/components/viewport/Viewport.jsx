import Breadcrumb from "./Breadcrumb";
import { JSONPreview } from "./JSONPreview";

export default function Viewport({ selectedPath, currentValue }) {
  // Generate dynamic title
  const getDynamicTitle = () => {
    if (Array.isArray(currentValue)) return "Array Structure";
    if (currentValue !== null && typeof currentValue === "object")
      return "Object Properties";
    return "Primitive Value";
  };
  return (
    <div className="flex flex-col h-full w-full bg-slate-50/30">
      <div className="p-4 border-b border-slate-100 bg-white">
        <Breadcrumb path={selectedPath} />
      </div>

      <div className="flex-1 p-4 overflow-hidden relative">
        <JSONPreview title={getDynamicTitle()} value={currentValue} />
      </div>
    </div>
  );
}
