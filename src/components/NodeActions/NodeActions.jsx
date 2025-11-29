import { useState } from "react";
import { Trash2, Plus, Edit2, MoreVertical } from "lucide-react";
import { IconButton } from "./IconButton";

export const NodeActions = ({ isObject }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative ml-auto">
      <IconButton
        icon={MoreVertical}
        title="Actions"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
      />
      {open && (
        <div
          className="absolute right-0 mt-1 bg-white shadow-md border rounded-lg p-2 flex flex-col z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton icon={Edit2} title="Rename" variant="edit" />
          {isObject && (
            <IconButton icon={Plus} title="Add child" variant="add" />
          )}
          <IconButton icon={Trash2} title="Delete" variant="delete" />
        </div>
      )}
    </div>
  );
};
