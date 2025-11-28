import Breadcrumb from "./Breadcrumb";
import { JSONPreview } from "./JSONPreview";

export default function Viewport({ selectedPath, currentValue }) {
  // Generate dynamic title
  const getDynamicTitle = () => {
    if (Array.isArray(currentValue)) return "Array Preview";
    if (currentValue !== null && typeof currentValue === "object")
      return "Object Preview";
    return "Value Preview";
  };
  return (
    <div className="bg-white  p-6 w-full">
      <div className="mb-6">
        <Breadcrumb path={selectedPath} />
      </div>

      <div className="mt-4">
        <JSONPreview title={getDynamicTitle()} value={currentValue} />
      </div>
    </div>
  );
}
