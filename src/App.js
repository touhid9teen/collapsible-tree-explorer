import Button from "./components/Button";

function App() {
  const onClick = () => {};
  return (
    <div className="flex h-screen w-screen item-center justify-center">
      <div>
        <Button onClick={onClick} children={"click me"} />
      </div>
    </div>
  );
}

export default App;
