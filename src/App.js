import { useState } from "react";
import Button from "./components/Button";
import Modal from "./components/modal/Modal";

function App() {
  const [showModal, setShowModal] = useState(false);
  const onClick = () => {
    setShowModal(true);
  };
  return (
    <div className="flex h-screen w-screen item-center justify-center">
      <div>
        <Button onClick={onClick} children={"click me"} />
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={"this is modal title"}
      >
        <div className="h-20 flex items-center justify-center flex-col">
          <div>this is test modal descriptions</div>
          <Button onClick={() => setShowModal(false)}>close</Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
