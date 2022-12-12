import {
  ActionContext,
  Color,
  Font,
  FontUnit,
  Label,
  Loader,
  Resource,
  vec,
  Text,
  Actor,
} from "excalibur";
import { useEffect, useReducer, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Game } from "../classes/Game";
import { Ship } from "../classes/Ship";
import { Station } from "../classes/Station";
import { arrayOfThings, getRandomScreenPosition, isMeeple } from "../utils";
import { Event, State } from "../types";
import { Meeple } from "../classes/Meeple";

const MIN_ZOOM = 0.9;
const MAX_ZOOM = 2;
const NUM_SHIPS = 30;
const NUM_STATIONS = 5;

let defaultState = {
  isPaused: false,
  actors: [],
  filters: {
    ships: true,
    stations: true,
  },
  selected: null,
  sidebarIsOpen: true,
};

function useGame() {
  let navigate = useNavigate();
  let { id } = useParams();
  let gameRef = useRef<Game | null>();
  let [state, dispatch] = useReducer(reducer, defaultState);

  function togglePaused(state: State, game: Game) {
    return state.isPaused ? game.stop() : game.start();
  }

  function initStation(): () => Station {
    return () => {
      let station = new Station();
      if (!gameRef.current) return station;
      station.pos = getRandomScreenPosition(gameRef.current);
      return station;
    };
  }

  function initCamera(game: Game) {
    let center = getCenterVec(game);
    game.currentScene.camera.strategy.camera.move(center, 0);
    game.currentScene.camera.strategy.camera.zoom = MIN_ZOOM;
  }

  function initActors(game: Game) {
    let stations = arrayOfThings<Station>(NUM_STATIONS, initStation());
    let ships = arrayOfThings<Ship>(NUM_SHIPS, initShip(game));

    ships.forEach((ship) => {
      game.add(ship);
      ship.actions.repeatForever(trade(stations, ship));
      ship.on("pointerdown", () => {
        navigate("/" + ship.id);
      });
    });

    stations.forEach((station) => {
      game.add(station);
      station.on("pointerdown", () => {
        navigate("/" + station.id);
      });

      var text = new Text({
        text: station.name,

        font: new Font({
          family: "verdana",
          size: 1,
          unit: FontUnit.Rem,
          color: Color.Orange,
        }),
      });

      const actor = new Actor({
        pos: vec(0, -10),
        width: text.width,
        height: text.height,
      });

      actor.graphics.use(text);

      actor.on("pointerdown", () => {
        navigate("/" + station.id);
      });

      station.addChild(actor);
    });
  }

  function getCenterVec(game: Game) {
    let center = vec(
      (game.drawWidth / 2) * game.currentScene.camera.zoom,
      (game.drawHeight / 2) * game.currentScene.camera.zoom
    );

    return center;
  }

  useEffect(() => {
    if (!gameRef.current) return;
    let meeples = gameRef.current?.currentScene.actors.filter(isMeeple);
    let selected = meeples?.find((a) => a.id === Number(id)) ?? null;

    dispatch({
      type: "set-selected",
      payload: {
        selected,
      },
    });

    if (selected) {
      gameRef.current.currentScene.camera.strategy.elasticToActor(
        selected,
        0.3,
        0.3
      );
      gameRef.current.currentScene.camera.strategy.camera.zoomOverTime(
        MAX_ZOOM,
        1000
      );
      gameRef.current.selected = selected;
    } else {
      let center = getCenterVec(gameRef.current);
      gameRef.current.currentScene.camera.clearAllStrategies();
      gameRef.current.currentScene.camera.strategy.camera.move(center, 1000);
      gameRef.current.currentScene.camera.strategy.camera.zoomOverTime(
        MIN_ZOOM,
        1000
      );
      gameRef.current.selected = null;
    }
  }, [id]);

  useEffect(() => {
    gameRef.current = new Game();
    initActors(gameRef.current);
    initCamera(gameRef.current);
    gameRef.current?.start();
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      let game = gameRef.current;

      dispatch({
        type: "update-actors",
        payload: {
          actors: game?.currentScene.actors as Meeple[],
        },
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return {
    dispatch,
    state,
    togglePaused,
  };
}

function initShip(game: Game): () => Ship {
  return () => {
    let ship = new Ship();
    ship.pos = getRandomScreenPosition(game);
    return ship;
  };
}

export function trade(stations: Station[], ship: Ship) {
  return (actions: ActionContext) => {
    if (!actions.getQueue().isComplete()) return;
    let station = stations[Math.floor(Math.random() * stations.length)];
    ship.destination = station;
    ship.status = "Traveling";

    actions
      .meet(station, Math.floor(Math.random() * 100) + 50)
      .callMethod(() => {
        if (!ship.destination) {
          return;
        }
        ship.visiting = station;
        ship.destination.visitors[ship.id] = ship;
        ship.status = "Parking";
      })
      .delay(Math.floor(Math.random() * 10000))
      .callMethod(() => {
        ship.status = "Trading";
      })
      .delay(Math.floor(Math.random() * 50000))
      .callMethod(() => {
        ship.status = "Leaving";
      })
      .delay(Math.floor(Math.random() * 10000))
      .callMethod(() => {
        if (!ship.destination) {
          return;
        }
        ship.visiting = null;
        ship.destination.visitors[ship.id] = null;
      });
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
    case "set-selected": {
      return {
        ...state,
        selected: event.payload?.selected ?? null,
      };
    }
    case "toggle-side-bar": {
      return {
        ...state,
        sidebarIsOpen: !state.sidebarIsOpen,
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
