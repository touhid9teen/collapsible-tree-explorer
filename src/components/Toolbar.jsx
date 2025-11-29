import { RotateCcw } from "lucide-react";
import { Button } from "./Button";

export const Toolbar = ({ onImport, onUndo, onRedo, canUndo, canRedo }) => (
  <div className="flex gap-2 p-4 border-b border-gray-300 bg-gray-50">
    <Button onClick={onImport} variant="primary">
      Import
    </Button>
    <Button onClick={onUndo} disabled={!canUndo} variant="secondary">
      <RotateCcw size={16} />
    </Button>
    <Button onClick={onRedo} disabled={!canRedo} variant="secondary">
      <RotateCcw size={16} style={{ transform: "scaleX(-1)" }} />
    </Button>
  </div>
);
