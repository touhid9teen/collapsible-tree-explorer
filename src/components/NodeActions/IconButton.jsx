export const IconButton = ({
  onClick,
  icon: Icon,
  title,
  variant = "default",
}) => {
  const variants = {
    default: "p-1 hover:bg-gray-200 rounded",
    edit: "p-1 hover:bg-blue-200 rounded",
    add: "p-1 hover:bg-green-200 rounded",
    delete: "p-1 hover:bg-red-200 rounded",
  };

  return (
    <button
      onClick={onClick}
      className={`${variants[variant]} transition-colors duration-150`}
      title={title}
    >
      <Icon size={14} />
    </button>
  );
};
