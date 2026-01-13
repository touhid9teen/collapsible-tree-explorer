export const IconButton = ({
  onClick,
  icon: Icon,
  title = "",
  variant = "default",
}) => {
  const variants = {
    default: {
      base: "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 border border-gray-200",
      shadow: "hover:shadow-sm",
    },
    edit: {
      base: "bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 border border-blue-200",
      shadow: "hover:shadow-blue-100",
    },
    add: {
      base: "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 hover:text-emerald-700 border border-emerald-200",
      shadow: "hover:shadow-emerald-100",
    },
    delete: {
      base: "bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200",
      shadow: "hover:shadow-red-100",
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
        focus:outline-none focus:ring-2 focus:ring-offset-1
        ${variant === "edit" ? "focus:ring-blue-300" : ""}
        ${variant === "add" ? "focus:ring-emerald-300" : ""}
        ${variant === "delete" ? "focus:ring-red-300" : ""}
        ${variant === "default" ? "focus:ring-gray-300" : ""}
      `}
      title={title}
    >
      <Icon size={16} strokeWidth={2} />
      {title && <span className="text-sm font-medium whitespace-nowrap">{title}</span>}
    </button>
  );
};
