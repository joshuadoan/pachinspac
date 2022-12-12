import Header from "./components/Header";
import useGame from "./hooks/useGame";

import "./App.css";
import SideBar from "./components/SideBar";

function App() {
  const { state, dispatch } = useGame();

  return (
    <div className=" bg-black text-white flex flex-col h-screen w-full">
      <Header dispatch={dispatch} state={state} />
      <main className="flex flex-1 overflow-hidden">
        <SideBar dispatch={dispatch} state={state} />
        <canvas id="pepper" />
      </main>
    </div>
  );
}

export default App;
