import {
  Color,
  ImageSource,
  ParallaxComponent,
  SpriteSheet,
  TileMap,
  Timer,
  vec,
} from "excalibur";
import { useEffect, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../engine/Game";
import { Ship } from "../engine/Ship";
import { Station } from "../engine/Station";
import { arrayOfThings, getRandomScreenPosition, isMeeple } from "../utils";
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

    let ships = arrayOfThings<Ship>(30, () => new Ship());

    ships.forEach((ship) => {
      if (!gameRef.current) return;
      ship.pos = getRandomScreenPosition(gameRef.current);
      gameRef.current.add(ship);

      ship.actions.repeatForever((actions) => {
        let station = stations[Math.floor(Math.random() * stations.length)];
        ship.destination = station;

        actions
          .meet(station, Math.floor(Math.random() * 100) + 50)
          .callMethod(() => {
            if (!ship.destination) {
              return;
            }
            ship.destination.visitors[ship.id] = ship;
          })
          .delay(Math.floor(Math.random() * 10000))
          .callMethod(() => {
            if (!ship.destination) {
              return;
            }
            ship.destination.visitors[ship.id] = null;
          });
      });
    });
  }

  useEffect(() => {
    gameRef.current = new Game();
    init(gameRef.current);
  }, []);

  useEffect(() => {
    if (!gameRef.current) return;

    if (selected) {
      gameRef.current.currentScene.camera.zoomOverTime(2, 1000);

      gameRef.current.currentScene.camera.strategy.elasticToActor(
        selected,
        0.3,
        0.3
      );
    } else {
      let center = vec(
        (gameRef.current.drawWidth / 2) *
          gameRef.current.currentScene.camera.zoom,
        (gameRef.current.drawHeight / 2) *
          gameRef.current.currentScene.camera.zoom
      );
      gameRef.current.currentScene.camera.clearAllStrategies();
      gameRef.current.currentScene.camera.zoomOverTime(1, 1000);
      gameRef.current.currentScene.camera.strategy.camera.move(center, 1000);

      // gameRef.current.currentScene.camera.strategy.camera.pos = ;
    }
  }, [selected]);

  useEffect(() => {
    let interval = setInterval(() => {
      let game = gameRef.current;

      dispatch({
        type: "update-actors",
        payload: {
          actors: game?.currentScene.actors.filter(isMeeple).map((a) => a),
        },
      });
    }, 500);

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
