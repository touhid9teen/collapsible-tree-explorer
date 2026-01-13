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
import { FileJson, Github } from "lucide-react";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [importedJson, setImportedJson] = useLocalStorage("importedJson", {});
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [selectedPath, setSelectedPath] = useState([]);
  const [disableNodePath, setDisableNodePath] = useLocalStorage(
    "disableNodePath",
    {}
  );
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
    const isDisable = disableNodePath[nodePath];
    if (isDisable) {
      alert("THIS NODE IS DISABLED AND CANNOT BE DELETED");
      return;
    }
    if (nodePath.length <= 1) {
      alert("CANNOT DELETE ROOT NODE");
      return;
    }
    setImportedJson(removeNodeAtPath(importedJson, nodePath));
    setSelectedPath(nodePath.slice(0, -1));
  };

  const handleDisable = (nodePath) => {
    const pathStr = Array.isArray(nodePath) ? nodePath.join(">") : nodePath;

    setDisableNodePath((prev) => {
        const newState = { ...prev };
        if (newState[pathStr]) {
            delete newState[pathStr];
        } else {
            newState[pathStr] = true;
        }
        return newState;
    });
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
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      {/* Navbar / Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 support-[backdrop-filter]:bg-white/60">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-200">
              <FileJson className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                JSON Explorer
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="hidden sm:flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 text-slate-50 rounded-full hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-xl hover:-translate-y-0.5 group border border-slate-800"
              onClick={() => window.open('https://github.com/touhid9teen/collapsible-tree-explorer', '_blank')}
            >
              <Github className="w-5 h-5 text-white" />
              <span className="font-semibold text-sm tracking-wide group-hover:text-white">Star my work</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)]">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Tree Section - Sidebar style on desktop */}
          <section className="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Explorer</h2>
                <Button
                  variant="primary"
                  onClick={() => openModal("import")}
                  className="!py-1.5 !px-3 !text-xs"
                >
                  Import JSON
                </Button>
             </div>
             
             <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
               <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <input 
                    type="text" 
                    placeholder="Search nodes..." 
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    disabled
                  />
               </div>
               <div className="flex-1 overflow-auto custom-scrollbar p-2">
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
                    onDisable={() => openModal("disable")}
                    disabledNodes={disableNodePath}
                  />
               </div>
               <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-center text-slate-500">
                  {Object.keys(importedJson).length > 0 ? "Drag & drop to reorder" : "Start by importing JSON"}
               </div>
             </div>
          </section>

          {/* Viewport Section - Main content area */}
          <section className="w-full lg:flex-1 h-full flex flex-col gap-4">
             <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Properties & Preview</h2>
             <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
                <Viewport selectedPath={selectedPath} currentValue={currentValue} />
             </div>
          </section>
        </div>
      </main>

      {/* Modal */}
      <DynamicModal
        type={actionType}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(key, value) => {
          if (actionType === "import") handleImport(value);
          if (actionType === "add") handleAdd(key, value);
          if (actionType === "update") handleUpdate(selectedPath, key, value);
          if (actionType === "delete") handleDelete(selectedPath);
          if (actionType === "disable") handleDisable(selectedPath);
        }}
        initialKey={actionType === "update" ? selectedKey : ""}
        initialValue={actionType === "update" ? currentValue : ""}
        nodeKey={
          selectedPath.length > 0 ? selectedPath[selectedPath.length - 1] : ""
        }
        isCurrentlyDisabled={
          disableNodePath[Array.isArray(selectedPath) ? selectedPath.join(">") : selectedPath]
        }
      />
    </div>
  );
}
