import "./App.css";
import Board from "./Board/Board";

function App() {
  return (
    <div className="App">
      <Board numOfCells={7} />
    </div>
  );
}

export default App;
