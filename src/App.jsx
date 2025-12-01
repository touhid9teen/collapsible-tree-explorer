import { useState } from "react";
import Button from "./components/Button";
import Viewport from "./components/viewport/Viewport";
import Tree from "./components/tree/Tree";
import {
  addNodeAtPath,
  getValueAtPath,
  isObject,
  moveNodeAtPath,
  removeNodeAtPath,
  updateNodeAtPath,
} from "./utils/treeUtils";
import DynamicModal from "./components/modal/DinamicModal";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [importedJson, setImportedJson] = useLocalStorage("importedJson", {});
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [selectedPath, setSelectedPath] = useState([]);
  const [draggedNode, setDraggedNode] = useState(null);
  const [actionType, setActionType] = useState("");

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
  };

  const handleAdd = (key, value) => {
    setImportedJson(addNodeAtPath(importedJson, selectedPath, key, value));
    setSelectedPath([...selectedPath, key]);
  };

  const handleUpdate = (nodePath, newKey, newValue) => {
    const oldKey = nodePath[nodePath.length - 1];
    const currentNode = getValueAtPath(importedJson, nodePath);
    const isParent = typeof currentNode === "object" && currentNode !== null;

    const valueToSet = isParent ? currentNode : newValue;

    const updatedJson = updateNodeAtPath(
      importedJson,
      nodePath,
      newKey,
      valueToSet
    );
    setImportedJson(updatedJson);

    if (newKey !== oldKey) {
      setSelectedPath([...nodePath.slice(0, -1), newKey]);
    }
  };

  const handleDelete = (nodePath) => {
    if (nodePath.length <= 1) {
      alert("CANNOT DELETE ROOT NODE");
      return;
    }
    setImportedJson(removeNodeAtPath(importedJson, nodePath));
    setSelectedPath(nodePath.slice(0, -1));
  };

  const handleDragStart = (e, sourcePath, nodeKey) => {
    setDraggedNode({ path: sourcePath, key: nodeKey });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, targetPath, isObject) => {
    if (!isObject) {
      e.dataTransfer.dropEffect = "none";
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetPath) => {
    e.preventDefault();

    if (!draggedNode) return;
    const draggedPathStr = draggedNode.path.join(">");
    const targetPathStr = targetPath.join(">");

    if (
      draggedPathStr === targetPathStr ||
      targetPathStr.startsWith(draggedPathStr + ">")
    ) {
      setDraggedNode(null);
      return;
    }

    const targetNode = getValueAtPath(importedJson, targetPath);
    if (!isObject(targetNode)) {
      setDraggedNode(null);
      return;
    }

    const newJson = moveNodeAtPath(
      importedJson,
      draggedNode.path,
      targetPath,
      draggedNode.key
    );

    setImportedJson(newJson);
    setSelectedPath([...targetPath, draggedNode.key]);
    setDraggedNode(null);
  };
  const handleDragEnd = (e) => {
    setDraggedNode(null);
  };
  const selectedKey =
    selectedPath.length > 0 ? selectedPath[selectedPath.length - 1] : "";

  const currentValue =
    selectedPath.length === 0
      ? importedJson
      : getValueAtPath(importedJson, selectedPath);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 md:p-10">
      <div className="mb-4 bg-white rounded-xl shadow-sm border p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-500 leading-tight">
            JSON Tree
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2">
            Explore & Manage Hierarchical Data
          </p>
        </div>
      </div>

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
              onEdit={() => openModal("update")}
              onDelete={() => openModal("delete")}
              draggedNode={draggedNode}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
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
          if (actionType === "update") handleUpdate(selectedPath, key, value);
          if (actionType === "delete") handleDelete(selectedPath);
        }}
        initialKey={actionType === "update" ? selectedKey : ""}
        initialValue={actionType === "update" ? currentValue : ""}
        nodeKey={
          selectedPath.length > 0 ? selectedPath[selectedPath.length - 1] : ""
        }
      />
    </div>
  );
}
