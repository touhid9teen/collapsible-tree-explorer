export default function Breadcrumb({ path }) {
  const displayPath = path.length === 0 ? "root" : path.join(" > ");
  return (
    <div className="mb-4">
      <div className="text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded border border-gray-300">
        {displayPath}
      </div>
    </div>
  );
}
