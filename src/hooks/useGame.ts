import {
  Color,
  Font,
  FontUnit,
  vec,
  Text,
  Actor,
  CollisionType,
} from "excalibur";
import { useEffect, useReducer, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Game } from "../classes/Game";
import { Ship } from "../classes/Ship";
import { Station } from "../classes/Station";
import { arrayOfThings, getRandomScreenPosition, isMeeple } from "../utils";
import { Event, State } from "../types";
import { Meeple } from "../classes/Meeple";
import { taxi, trade } from "../behaviors/trade";

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 2;
const NUM_SHIPS = 30;
const NUM_TAXIS = 3;
const NUM_STATIONS = 5;

let defaultState = {
  isPaused: false,
  actors: [],
  filters: {
    ships: true,
    stations: true,
  },
  selected: null,
  sidebarIsOpen: false,
};

function useGame() {
  let navigate = useNavigate();
  let { id } = useParams();
  let gameRef = useRef<Game | null>();
  let [state, dispatch] = useReducer(reducer, defaultState);

  function togglePaused(state: State, game: Game) {
    return state.isPaused ? game.stop() : game.start();
  }

  function initStation(): Station {
    let station = new Station();
    if (!gameRef.current) return station;

    station.pos = getRandomScreenPosition(gameRef.current);
    station.on("pointerdown", () => {
      navigate("/" + station.id);
    });

    station.attributes = {
      ...station.attributes,
      status: "Open",
    };

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
      collisionType: CollisionType.Active,
      width: text.width,
      height: text.height,
    });

    actor.graphics.use(text);

    actor.on("pointerdown", () => {
      navigate("/" + station.id);
    });

    station.addChild(actor);
    return station;
  }

  function initCamera(game: Game) {
    let center = getCenterVec(game);
    let { camera } = game.currentScene;
    camera.strategy.camera.zoom = MIN_ZOOM;
    camera.strategy.camera.move(center, 0);
  }

  function initActors(game: Game) {
    let stations = arrayOfThings<Station>(NUM_STATIONS, initStation);
    let ships = arrayOfThings<Ship>(NUM_SHIPS, () => initShip(game));
    let taxis = arrayOfThings<Ship>(NUM_TAXIS, () => initShip(game));

    ships.forEach((ship) => {
      game.add(ship);
      ship.actions.repeatForever(trade(stations, ship));
    });

    taxis.forEach((ship) => {
      ship.color = Color.Yellow;
      game.add(ship);
      ship.actions.repeatForever(taxi(ships));
    });

    stations.forEach((station) => {
      game.add(station);
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
    let actors = window.localStorage.getItem("pachinspac");

    if (actors && JSON.parse(actors).length) {
      dispatch({
        type: "update-actors",
        payload: JSON.parse(actors),
      });
      JSON.parse(actors);
    } else {
      initActors(gameRef.current);
    }

    initCamera(gameRef.current);
    gameRef.current.start();
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

function initShip(game: Game): Ship {
  let ship = new Ship();
  ship.pos = getRandomScreenPosition(game);
  return ship;
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

export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
