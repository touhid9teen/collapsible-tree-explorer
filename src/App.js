import { useState } from "react";
import Button from "./components/Button";
import ImportModal from "./components/modal/ImportModal";
import Viewport from "./components/viewport/Viewport";
import Tree from "./components/tree/Tree";
import { getValueAtPath } from "./utils/treeUtils";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [importedJson, setImportedJson] = useState({});
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [selectedPath, setSelectedPath] = useState([]);
  const toggleExpand = (nodePath) => {
    const pathStr = nodePath.join(">");
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      newSet.has(pathStr) ? newSet.delete(pathStr) : newSet.add(pathStr);
      return newSet;
    });
  };

  const handleImport = (value) => {
    setShowModal(false);
    setSelectedPath([]);
    setImportedJson(value);
  };

  const currentValue =
    selectedPath.length === 0
      ? importedJson
      : getValueAtPath(importedJson, selectedPath);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md border p-6 flex flex-col overflow-hidden">
          <div>
            <Button onClick={() => setShowModal(true)}>Import JSON</Button>
          </div>

          <div className="flex-1 mt-4 overflow-auto rounded border bg-gray-50 p-4">
            <Tree
              data={importedJson}
              selectedPath={selectedPath}
              onSelect={setSelectedPath}
              expendedNodes={expandedNodes}
              onToggleExpand={toggleExpand}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md border  flex flex-col overflow-hidden">
          <Viewport selectedPath={selectedPath} currentValue={currentValue} />
        </div>
      </div>

      <ImportModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onImport={handleImport}
      />
    </div>
  );
}
