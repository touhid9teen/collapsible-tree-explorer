import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { isObject } from "../../utils/treeUtils";

export default function TreeNode({ nodeKey, value }) {
  const isObj = isObject(value);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = isObj && Object.keys(value).length > 0;

  return (
    <div className="select-none ml-2">
      <div
        className="flex items-start gap-2 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 transition"
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {hasChildren ? (
          <ChevronDown
            className={`h-4 w-4 mt-1 transition-transform ${
              isExpanded ? "rotate-0" : "-rotate-90"
            }`}
          />
        ) : (
          <div className="w-4" />
        )}

        <span className="text-sm font-semibold text-gray-900">{nodeKey}</span>
      </div>

      {isExpanded && hasChildren && (
        <div className="border-l border-gray-300 ml-5 pl-3 mt-1">
          {Object.entries(value).map(([childKey, childValue]) => (
            <TreeNode key={childKey} nodeKey={childKey} value={childValue} />
          ))}
        </div>
      )}
    </div>
  );
}
