import { useEffect, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../engine/Game";
import { isMeeple } from "../engine/utils";
import { Event, State } from "../types";

let defaultState = {
  isPaused: true,
  actors: [],
};

function useGame() {
  let { id } = useParams();
  let gameRef = useRef<Game | null>();
  let [state, dispatch] = useReducer(reducer, defaultState);

  let selected = gameRef.current?.currentScene.actors
    .filter(isMeeple)
    .find((a) => a.id === Number(id));

  function togglePaused() {
    return state.isPaused ? gameRef.current?.stop() : gameRef.current?.start();
  }

  useEffect(() => {
    gameRef.current = new Game();
    gameRef.current.initialize();

    dispatch({
      type: "update-actors",
      payload: {
        actors: gameRef.current?.currentScene.actors
          .filter(isMeeple)
          .map((a) => a),
      },
    });
  }, []);

  useEffect(() => {
    state.isPaused ? gameRef.current?.stop() : gameRef.current?.start();
  }, [state.isPaused]);

  return {
    dispatch,
    selected,
    state,
    togglePaused,
  };
}

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

export default useGame;
