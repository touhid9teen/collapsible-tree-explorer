import TreeNode from "./TreeNode";

export default function Tree({
  data,
  onSelect,
  selectedPath,
  expandedNodes,
  onToggleExpand,
  onAdd,
  onEdit,
  onDelete,
  draggedNode,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  onDisable,
  disabledNodes = {},
}) {
  if (!data || typeof data !== "object") return <p>No JSON Loaded</p>;

  return (
    <div className="w-full text-sm text-slate-700 pb-12">
      {Object.entries(data).map(([key, value]) => (
        <TreeNode
          key={key}
          nodeKey={key}
          value={value}
          onSelect={onSelect}
          path={[]}
          expandedNodes={expandedNodes}
          onToggleExpand={onToggleExpand}
          selectedPath={selectedPath}
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
  );
}
