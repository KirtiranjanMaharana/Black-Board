import "./App.css";
import Board from "./board/Board";
import Header from "./components/Header";
import ToolBox from "./components/ToolBox";

function App() {
  return (
    <>
      <Header />
      <ToolBox />
      <Board/>
    </>
  );
}

export default App;
