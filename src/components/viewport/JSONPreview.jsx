export const JSONPreview = ({ title, value }) => (
  <div className="flex-1">
    <label className="block text-xs font-semibold text-gray-600 mb-2">
      {title}
    </label>
    <pre className="bg-gray-100 p-4 rounded border border-gray-300  text-sm text-gray-800 font-mono h-full whitespace-pre-wrap break-all">
      {JSON.stringify(value, null, 2)}
    </pre>
  </div>
);
