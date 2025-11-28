import { useState } from "react";
import Button from "./components/Button";
import ImportModal from "./components/modal/ImportModal";
import Viewport from "./components/viewport/Viewport";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [importedJson, setImportedJson] = useState("");

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100 py-12 px-6">
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-10 w-full max-w-8xl">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-start bg-white rounded-xl shadow-md border p-6">
          <Button onClick={() => setShowModal(true)}>Import JSON</Button>
        </div>

        {/* Right Section */}

        <Viewport
          selectedPath="dashboard > import-json"
          currentValue={importedJson}
        />
        {/* Modal */}
        <ImportModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onImport={setImportedJson}
        />
      </div>
    </div>
  );
}
