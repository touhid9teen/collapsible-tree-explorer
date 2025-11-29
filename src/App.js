import { useState } from "react";
import Button from "./components/Button";
import Viewport from "./components/viewport/Viewport";
import Tree from "./components/tree/Tree";
import {
  addNodeAtPath,
  getValueAtPath,
  removeNodeAtPath,
} from "./utils/treeUtils";
import DynamicModal from "./components/modal/DinamicModal";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [importedJson, setImportedJson] = useState({});
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [selectedPath, setSelectedPath] = useState([]);
  const [actionType, setActionType] = useState("");

  console.log("Imported JSON:", importedJson);

  const toggleExpand = (nodePath) => {
    const pathStr = nodePath.join(">");
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      newSet.has(pathStr) ? newSet.delete(pathStr) : newSet.add(pathStr);
      return newSet;
    });
  };
  const openModal = (type) => {
    setActionType(type);
    setShowModal(true);
  };

  const handleImport = (value) => {
    setSelectedPath([]);
    setImportedJson(value);
    setShowModal(false);
  };

  const handleAdd = (key, value) => {
    setImportedJson(addNodeAtPath(importedJson, selectedPath, key, value));
  };

  const handleUpdate = (nodePath, newValue) => {
    console.log(nodePath, newValue);
    setShowModal(false);
  };

  const handleDelete = (nodePath) => {
    if (nodePath.length <= 1) {
      alert("CANNOT DELETE ROOT NODE");
      return;
    }
    setImportedJson(removeNodeAtPath(importedJson, nodePath));
  };
  const currentValue =
    selectedPath.length === 0
      ? importedJson
      : getValueAtPath(importedJson, selectedPath);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md border p-6 flex flex-col ">
          <div>
            <Button
              onClick={() => {
                openModal("import");
              }}
            >
              Import JSON
            </Button>
          </div>

          <div className="flex-1 mt-4 overflow-auto rounded border bg-gray-50 p-4">
            <Tree
              data={importedJson}
              selectedPath={selectedPath}
              onSelect={setSelectedPath}
              expandedNodes={expandedNodes}
              onToggleExpand={toggleExpand}
              onAdd={() => openModal("add")}
              onDelete={() => openModal("delete")}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md border  flex flex-col overflow-hidden">
          <Viewport selectedPath={selectedPath} currentValue={currentValue} />
        </div>
      </div>

      <DynamicModal
        type={actionType}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(key, value) => {
          if (actionType === "import") handleImport(value);
          if (actionType === "add") handleAdd(key, value);
          if (actionType === "update") handleUpdate(selectedPath, value);
          if (actionType === "delete") handleDelete(selectedPath);
        }}
        initialKey={""}
        initialValue={""}
        nodeKey={
          selectedPath.length > 0 ? selectedPath[selectedPath.length - 1] : ""
        }
      />
    </div>
  );
}
