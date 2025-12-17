import "./App.css";
import Button from "./components/ui/Button";
import Card from "./components/Card";

function App() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <Button text={"siema"} />
      <Card />
    </div>
  );
}

export default App;
