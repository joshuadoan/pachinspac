import { useEffect, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";

import ActorList from "./components/ActorList";
import Selection from "./components/Selection";

import Header from "./components/Header";
import useGame from "./hooks/useGame";

import "./App.css";

function App() {
  const { state, dispatch, selected } = useGame();

  return (
    <div className="absolute h-screen overflow-hidden flex flex-col p-4 font-mono">
      <Header dispatch={dispatch} state={state} />
      <main className="flex-1 overflow-hidden">
        {selected ? (
          <Selection selected={selected} />
        ) : (
          <ActorList actors={state.actors} />
        )}
      </main>
    </div>
  );
}

export default App;
