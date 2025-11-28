import TreeNode from "./TreeNode";

export default function Tree({ data }) {
  if (!data || typeof data !== "object") return <p>No JSON Loaded</p>;

  return (
    <div className="text-sm text-gray-800 font-mono">
      {Object.entries(data).map(([key, value]) => (
        <TreeNode key={key} nodeKey={key} value={value} />
      ))}
    </div>
  );
}
