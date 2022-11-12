import { Actor } from "excalibur";
import { useEffect, useLayoutEffect, useReducer, useRef } from "react";
import { useParams, Link } from "react-router-dom";

import "./App.css";
import { Button, ButtonLink } from "./components/Button";
import { Game } from "./engine/Game";

type State = {
  isPaused: boolean;
  actors: Actor[];
};

let defaultState = {
  isPaused: false,
  actors: [],
};

type Event = {
  type: "toggle-paused" | "update-actors";
  payload?: Partial<State>;
};

function App() {
  let { id } = useParams();
  let gameRef = useRef<Game | null>();
  let [state, dispatch] = useReducer(reducer, defaultState);
  let selected = gameRef.current?.currentScene.actors.find(
    (a) => a.id === Number(id)
  );

  function reducer(state: State, event: Event) {
    switch (event.type) {
      case "toggle-paused":
        return {
          ...state,
          isPaused: !state.isPaused,
        };
      case "update-actors": {
        return {
          ...state,
          actors: event.payload?.actors ?? [],
        };
      }
    }
  }

  function initGame(game: Game) {
    game.initialize();
    return () => game.stop();
  }

  function handlePause(game: Game) {
    console.log("handlePause");
    if (!game) return;
    !state.isPaused ? game.start() : game.stop();
  }

  useEffect(() => {
    if (!gameRef.current) return;
    handlePause(gameRef.current);
  }, [state.isPaused]);

  useLayoutEffect(() => {
    gameRef.current = new Game();
    initGame(gameRef.current);
  }, []);

  useEffect(() => {
    dispatch({
      type: "update-actors",
      payload: {
        actors: gameRef.current.currentScene.actors.map((foo) => foo),
      },
    });
  }, []);

  return (
    <div className="absolute h-screen overflow-hidden  flex flex-col p-4">
      <header className="mb-4 flex gap-4">
        {selected && <ButtonLink to="/">back</ButtonLink>}
        <Button
          onClick={() =>
            dispatch({
              type: "toggle-paused",
            })
          }
        >
          {state.isPaused ? "play" : "pause"}
        </Button>
      </header>
      <main className="flex-1">
        {selected ? (
          <div className="flex gap-4">
            <ButtonLink to={String(selected.id)} className="capitalize">
              {selected.name}
            </ButtonLink>
          </div>
        ) : (
          <ul className=" bg-white overflow-auto mb-4">
            {state.actors.map((actor) => {
              return (
                <li key={actor.id} className="capitalize ">
                  <Link to={String(actor.id)} className="px-4 pt-2">
                    {actor.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
