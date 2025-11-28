import Breadcrumb from "./Breadcrumb";
import { JSONPreview } from "./JSONPreview";

export default function Viewport({ selectedPath, currentValue }) {
  return (
    <div className="bg-white  p-6 w-full">
      <div className="mb-6">
        <Breadcrumb path={selectedPath} />
      </div>

      <div className="mt-4">
        <JSONPreview title="Imported JSON:" value={currentValue} />
      </div>
    </div>
  );
}
