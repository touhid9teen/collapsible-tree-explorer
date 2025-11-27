export default function Button({
  onClick,
  variant = "primary",
  disable = false,
  children,
}) {
  const baseStyles =
    "px-3 py-2 rounded text-sm font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 ",
    secondary: "bg-gray-400 text-white hover:bg-gray-500 ",
  };

  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
