import { Trash2, Plus, Edit2 } from "lucide-react";
import { IconButton } from "./IconButton";

export const NodeActions = ({ isObject }) => (
  <div className="flex gap-1 justify-end ml-auto">
    <IconButton icon={Edit2} title="Rename" variant="edit" />
    {isObject && <IconButton icon={Plus} title="Add child" variant="add" />}
    <IconButton icon={Trash2} title="Delete" variant="delete" />
  </div>
);
