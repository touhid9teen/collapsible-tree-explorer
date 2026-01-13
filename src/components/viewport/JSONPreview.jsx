import { Code2, Copy } from "lucide-react";
import Button from "../Button";

export const JSONPreview = ({ title, value }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(value, null, 2));
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-700/50 shadow-inner overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
        <div className="flex items-center gap-2 text-slate-400">
          <Code2 size={14} />
          <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700"
          title="Copy to clipboard"
        >
          <Copy size={14} />
        </button>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar p-4 relative">
        <pre className="text-xs sm:text-sm font-mono leading-relaxed text-blue-100/90 whitespace-pre-wrap break-all">
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    </div>
  );
};
