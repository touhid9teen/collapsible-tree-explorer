import TreeNode from "./TreeNode";

export default function Tree({
  data,
  onSelect,
  selectedPath,
  expandedNodes,
  onToggleExpand,
  onAdd,
  onDelete,
}) {
  if (!data || typeof data !== "object") return <p>No JSON Loaded</p>;

  return (
    <div className="w-full text-sm text-gray-800 font-mono ">
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
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
