import { PaperAirplaneIcon, WrenchIcon } from "@heroicons/react/24/solid";

import ActorList from "./components/ActorList";
import Selection from "./components/Selection";

import Header from "./components/Header";
import useGame from "./hooks/useGame";

import "./App.css";
import { Button } from "./components/Button";
import { isShip, isStation } from "./engine/utils";

function App() {
  const { state, dispatch, selected } = useGame();
  let filtered = state.actors?.filter(function (m) {
    if (state.filters.ships && isShip(m)) {
      return true;
    }

    if (state.filters.stations && isStation(m)) {
      return true;
    }
    return false;
  });

  return (
    <div className="absolute h-screen overflow-hidden flex flex-col p-4 font-mono">
      <Header dispatch={dispatch} state={state} />
      <main className="flex-1 overflow-hidden">
        {selected ? (
          <Selection selected={selected} />
        ) : (
          <ActorList actors={filtered} />
        )}
      </main>
    </div>
  );
}

export default App;
