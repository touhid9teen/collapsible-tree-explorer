import { Edit2, Lock, MoreVertical, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { IconButton } from "./IconButton";

export const NodeActions = ({
  isObject,
  onAdd,
  onDelete,
  onEdit,
  onDisable,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative ml-auto">
      <IconButton
        icon={MoreVertical}     
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      />
      {open && (
        <div
          className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-xl ring-1 ring-slate-900/5 p-1 z-50 flex flex-col gap-0.5 origin-top-right animate-in fade-in zoom-in-95 duration-100"
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton
            onClick={onEdit}
            icon={Edit2}
            title="Rename"
            variant="edit"
          />
          {isObject && (
            <IconButton
              onClick={onAdd}
              icon={Plus}
              title="Add child"
              variant="add"
            />
          )}
          <IconButton
            onClick={onDelete}
            icon={Trash2}
            title="Delete"
            variant="delete"
          />
          <IconButton
            onClick={onDisable}
            icon={Lock}
            title="Disable"
            variant="default"
          />
        </div>
      )}
    </div>
  );
};
