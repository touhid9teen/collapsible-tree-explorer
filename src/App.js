import { useState } from "react";
import Button from "./components/Button";
import ImportModal from "./components/modal/ImportModal";
import Breadcrumb from "./components/viewport/Breadcrumb";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [importedJson, setImportedJson] = useState("");

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="grid grid-cols-3 gap-6 items-start w-[80%] ">
        {/* Left Section */}
        <div className="flex flex-col items-center">
          <Button onClick={() => setShowModal(true)}> Import JSON</Button>
        </div>

        {/* Separator */}
        <div className="w-full h-full flex justify-center">
          <div className="border-l border-gray-300 h-full"></div>
        </div>

        {/* Right Section with Breadcrumb */}
        <div className="w-full">
          {/* 👉 Breadcrumb above right content */}
          <div className="mb-3 flex ">
            <Breadcrumb path="dashboard > import-json" />
          </div>

          <div className="p-4 bg-white rounded shadow w-full">
            <h3 className="text-lg font-semibold mb-2">Imported JSON:</h3>
            <pre className="text-sm bg-gray-100 p-3 rounded">
              {JSON.stringify(importedJson, null, 2)}
            </pre>
          </div>
        </div>

        <ImportModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onImport={setImportedJson}
        />
      </div>
    </div>
  );
}
