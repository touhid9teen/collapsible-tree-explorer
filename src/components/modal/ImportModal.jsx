import { useState } from "react";
import Modal from "./Modal";
import Button from "../Button";

export default function ImportModal({ isOpen, onClose, onImport }) {
  const [json, setJson] = useState("");
  const handleImport = () => {
    try {
      const importedJson = JSON.parse(json);
      onImport(importedJson);
      setJson("");
    } catch {
      alert("Invalid JSON");
    }
  };
  return (
    <Modal open={isOpen} title="Import JSON" onClose={onClose}>
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
        className="w-full h-48 p-3 border border-gray-300 rounded font-mono text-sm mb-4 resize-none"
        placeholder="Paste JSON here..."
      />
      <div className="flex gap-2 justify-end">
        <Button onClick={onClose} variant="secondary" children="Cancel" />
        <Button onClick={handleImport} variant="primary" children="Import" />
      </div>
    </Modal>
  );
}
