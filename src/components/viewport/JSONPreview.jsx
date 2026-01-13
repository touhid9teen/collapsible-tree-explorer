import { Code2, Copy, Check } from "lucide-react";
import { useState } from "react";
import Button from "../Button";

export const JSONPreview = ({ title, value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(value, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
          className={`
            transition-all duration-200 p-1.5 rounded-md flex items-center gap-1.5
            ${isCopied ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:text-white hover:bg-slate-700"}
          `}
          title={isCopied ? "Copied!" : "Copy to clipboard"}
        >
          {isCopied ? <Check size={14} /> : <Copy size={14} />}
          {isCopied && <span className="text-[10px] font-medium animate-in fade-in slide-in-from-right-1">Copied</span>}
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
