import { useState } from "react";
import Button from "./components/Button";
import ImportModal from "./components/modal/ImportModal";
import Viewport from "./components/viewport/Viewport";
import Tree from "./components/tree/Tree";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [importedJson, setImportedJson] = useState({});

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md border p-6 flex flex-col overflow-hidden">
          <div>
            <Button onClick={() => setShowModal(true)}>Import JSON</Button>
          </div>

          <div className="flex-1 mt-4 overflow-auto rounded border bg-gray-50 p-4">
            <Tree data={importedJson} />
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md border  flex flex-col overflow-hidden">
          <Viewport
            selectedPath="dashboard > import-json"
            currentValue={importedJson}
          />
        </div>
      </div>

      <ImportModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onImport={setImportedJson}
      />
    </div>
  );
}
