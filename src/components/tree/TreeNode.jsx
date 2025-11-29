import { ChevronDown } from "lucide-react";
import { isObject } from "../../utils/treeUtils";
import { NodeActions } from "../NodeActions/NodeActions";

export default function TreeNode({
  nodeKey,
  value,
  path,
  onSelect,
  selectedPath,
  expandedNodes,
  onToggleExpand,
  onAdd,
  onEdit,
  onDelete,
}) {
  const isObj = isObject(value);
  const nodePath = [...path, nodeKey];
  const pathStr = nodePath.join(">");
  const isSelected = JSON.stringify(nodePath) === JSON.stringify(selectedPath);
  const isExpanded = expandedNodes.has(pathStr);
  const hasChildren = isObj && Object.keys(value).length > 0;

  return (
    <div className="select-none w-full">
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-gray-100 transition-colors duration-150 ${
          isSelected ? "bg-blue-100 border-l-2 border-blue-500" : ""
        }`}
        onClick={() => onSelect(nodePath)}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(nodePath);
            }}
            className="p-0 hover:bg-gray-200 rounded transition-colors duration-150"
          >
            <ChevronDown
              className={`h-4 w-4 mt-1 transition-transform ${
                isExpanded ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>
        ) : (
          <div className="w-4" />
        )}

        <span className="text-sm font-semibold text-gray-900">{nodeKey}</span>

        {isSelected && (
          <NodeActions
            isObject={isObj}
            onAdd={() => onAdd(nodePath)}
            onEdit={() => onEdit(nodePath)}
            onDelete={() => onDelete(nodePath)}
          />
        )}
      </div>

      {isExpanded && hasChildren && (
        <div className="border-l border-gray-300 ml-5 pl-3 mt-1 min-w-[200px]">
          {Object.entries(value).map(([childKey, childValue]) => (
            <TreeNode
              key={childKey}
              nodeKey={childKey}
              value={childValue}
              path={nodePath}
              onSelect={onSelect}
              selectedPath={selectedPath}
              expandedNodes={expandedNodes}
              onToggleExpand={onToggleExpand}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
