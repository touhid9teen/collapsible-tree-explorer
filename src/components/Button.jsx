export default function Button({
  onClick,
  variant = "primary",
  disable = false,
  children,
  className = "",
}) {
  const baseStyles =
    "px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shadow-sm hover:shadow-md";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 border border-transparent shadow-indigo-100 hover:shadow-indigo-200 focus-visible:ring-indigo-500",
    secondary:
      "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 focus-visible:ring-slate-400",
    danger:
      "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 focus-visible:ring-red-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}
