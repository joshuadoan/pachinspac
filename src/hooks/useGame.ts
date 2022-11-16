import { Color, Timer } from "excalibur";
import { useEffect, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../engine/Game";
import { Ship } from "../engine/Ship";
import { Station } from "../engine/Station";
import {
  arrayOfThings,
  flyToRandomStation,
  getRandomScreenPosition,
  isMeeple,
} from "../utils";
import { Event, State } from "../types";

let defaultState = {
  isPaused: true,
  actors: [],
  filters: {
    ships: true,
    stations: true,
  },
};

function useGame() {
  let { id } = useParams();
  let gameRef = useRef<Game | null>();
  let [state, dispatch] = useReducer(reducer, defaultState);

  let meeples = gameRef.current?.currentScene.actors.filter(isMeeple);
  let selected = meeples?.find((a) => a.id === Number(id));

  function togglePaused() {
    return state.isPaused ? gameRef.current?.stop() : gameRef.current?.start();
  }

  function init(game: Game) {
    let stations = arrayOfThings<Station>(10, () => new Station());

    stations.forEach((station) => {
      station.pos = getRandomScreenPosition(game);
      game.add(station);
    });

    let ships = arrayOfThings<Ship>(50, () => new Ship());

    ships.forEach((ship) => {
      if (!gameRef.current) return;
      ship.pos = getRandomScreenPosition(gameRef.current);

      gameRef.current.add(ship);

      let timer = new Timer({
        fcn: () => flyToRandomStation(ship, stations),
        repeats: true,
        interval: 1000,
      });
      gameRef.current.add(timer);
      timer.start();
    });
  }

  useEffect(() => {
    gameRef.current = new Game();
    init(gameRef.current);
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      let game = gameRef.current;

      dispatch({
        type: "update-actors",
        payload: {
          actors: game?.currentScene.actors.filter(isMeeple).map((a) => a),
        },
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function start() {
      await gameRef.current?.start();
    }
    state.isPaused ? gameRef.current?.stop() : start();
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
    case "update-filters": {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...event.payload?.filters,
        },
      };
    }
  }
}

export default useGame;
