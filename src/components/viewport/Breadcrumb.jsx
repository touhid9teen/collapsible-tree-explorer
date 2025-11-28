export default function Breadcrumb({ path }) {
  return (
    <div className="mb-4">
      <div className="text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded border border-gray-300">
        {path}
      </div>
    </div>
  );
}
