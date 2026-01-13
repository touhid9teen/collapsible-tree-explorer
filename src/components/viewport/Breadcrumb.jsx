import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ path }) {
  if (path.length === 0) {
    return (
      <div className="flex items-center text-sm text-slate-500 font-medium">
        <Home className="w-4 h-4 mr-1.5" />
        <span>Root</span>
      </div>
    );
  }

  return (
    <div className="flex items-center flex-wrap gap-1.5 text-sm">
      <div className="flex items-center text-slate-400">
        <Home className="w-3.5 h-3.5" />
      </div>
      
      {path.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5 min-w-0">
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className={`truncate max-w-[150px] font-medium ${
            index === path.length - 1 ? "text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md" : "text-slate-600 hover:text-slate-800"
          }`}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}
