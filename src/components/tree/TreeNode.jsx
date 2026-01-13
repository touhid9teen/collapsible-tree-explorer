import { ChevronDown, Lock } from "lucide-react";
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
  onDragStart,
  onDragOver,
  onDrop,
  draggedNode,
  onDragEnd,
  onDisable,
  disabledNodes = {},
}) {
  const isObj = isObject(value);
  const nodePath = [...path, nodeKey];
  const pathStr = nodePath.join(">");
  const isSelected = JSON.stringify(nodePath) === JSON.stringify(selectedPath);
  const isExpanded = expandedNodes.has(pathStr);
  const hasChildren = isObj && Object.keys(value).length > 0;
  const isDragging =
    draggedNode &&
    JSON.stringify(draggedNode.path) === JSON.stringify(nodePath);
  
  const isDisabled = disabledNodes[pathStr];

  return (
    <div className="select-none w-full relative">
      <div
        className={`
          group flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer 
          transition-all duration-200 border border-transparent
          ${
            isDisabled 
            ? "bg-slate-50" 
            : isSelected
              ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm"
              : "hover:bg-slate-50 hover:border-slate-200 text-slate-700 hover:text-slate-900"
          } 
          ${isDragging ? "opacity-50 scale-[0.98] border-dashed border-indigo-400 bg-indigo-50/50" : ""}
        `}
        draggable={!isDisabled}
        onDragStart={(e) => !isDisabled && onDragStart(e, nodePath, nodeKey)}
        onDragOver={(e) => !isDisabled && onDragOver(e, nodePath, isObj)}
        onDrop={(e) => !isDisabled && onDrop(e, nodePath)}
        onDragEnd={(e) => !isDisabled && onDragEnd(e)}
        onClick={() => onSelect(nodePath)}
      >
        <div className="flex items-center justify-center w-5 h-5 shrink-0">
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand(nodePath);
              }}
              className={`
                p-0.5 rounded-sm transition-all duration-200 
                ${isDisabled ? "text-slate-400" : isSelected ? "hover:bg-indigo-100 text-indigo-500" : "hover:bg-slate-200 text-slate-400 group-hover:text-slate-600"}
              `}
              disabled={isDisabled}
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isExpanded ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>
          )}
        </div>

        <span className={`text-sm flex items-center gap-2 ${isSelected ? "font-semibold" : "font-medium"} ${isDisabled ? "text-slate-400 line-through decoration-slate-300" : ""}`}>
          {nodeKey}
          {isDisabled && <Lock className="w-3 h-3 text-slate-400" />}
        </span>

        {isDragging ? (
          <span className="text-xs font-semibold text-indigo-600 ml-auto px-2 py-0.5 bg-indigo-100/50 rounded flex items-center gap-1 animate-pulse">
            Moving...
          </span>
        ) : isSelected ? (
          <NodeActions
            isObject={isObj}
            onAdd={() => onAdd(nodePath)}
            onEdit={() => onEdit(nodePath)}
            onDelete={() => onDelete(nodePath)}
            onDisable={() => onDisable(nodePath)}
            isDisabled={isDisabled}
          />
        ) : null}
      </div>

      {isExpanded && hasChildren && (
        <div className="relative ml-[1.625rem] pl-2 mt-1 space-y-0.5">
          {/* Vertical guide line */}
          <div className="absolute left-0 top-0 bottom-2 w-px bg-slate-200"></div>
          
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
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              draggedNode={draggedNode}
              onDragEnd={onDragEnd}
              onDisable={onDisable}
              disabledNodes={disabledNodes}
            />
          ))}
        </div>
      )}
    </div>
  );
}
