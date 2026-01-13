export const IconButton = ({
  onClick,
  icon: Icon,
  title = "",
  variant = "default",
}) => {
  const variants = {
    default: {
      base: "bg-transparent hover:bg-slate-100 text-slate-500 hover:text-slate-700 border border-transparent hover:border-slate-200",
      shadow: "",
    },
    edit: {
      base: "bg-indigo-50 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-700 border border-indigo-200",
      shadow: "shadow-sm",
    },
    add: {
      base: "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 hover:text-emerald-700 border border-emerald-200",
      shadow: "shadow-sm",
    },
    delete: {
      base: "bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200",
      shadow: "shadow-sm",
    },
  };

  const currentVariant = variants[variant];

  return (
    <button
      onClick={onClick}
      className={`
        ${currentVariant.base}
        ${currentVariant.shadow}
        px-2.5 py-1.5 rounded-md
        transition-all duration-200 ease-in-out
        flex items-center gap-2
        active:scale-95
        outline-none
        focus-visible:ring-2 focus-visible:ring-offset-1
        ${variant === "edit" ? "focus-visible:ring-indigo-300" : ""}
        ${variant === "add" ? "focus-visible:ring-emerald-300" : ""}
        ${variant === "delete" ? "focus-visible:ring-rose-300" : ""}
        ${variant === "default" ? "focus-visible:ring-slate-300" : ""}
      `}
      title={title}
    >
      <Icon size={15} strokeWidth={2} />
      {title && <span className="text-xs font-semibold whitespace-nowrap">{title}</span>}
    </button>
  );
};
