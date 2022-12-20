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
import { taxi, trader } from "../behaviors/behaviors";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 1.2;
const NUM_SHIPS = 30;
const NUM_TAXIS = 1;
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

    let { camera } = gameRef.current.currentScene;

    if (selected) {
      camera.clearAllStrategies();
      camera.strategy.elasticToActor(selected, 0.3, 0.3);
      camera.strategy.camera.zoomOverTime(MAX_ZOOM, 1000);
    } else {
      camera.clearAllStrategies();

      let center = getCenterVec(gameRef.current);
      camera.strategy.camera.move(center, 1000);
      camera.strategy.camera.zoomOverTime(MIN_ZOOM, 1000);
    }
  }, [id]);

  useEffect(() => {
    let game = new Game();
    gameRef.current = game;

    let stations = arrayOfThings<Station>(NUM_STATIONS, () =>
      initStation(game, (id) => {
        navigate("/" + id);
      })
    );

    let ships = arrayOfThings<Ship>(NUM_SHIPS, () => initShip(game));
    let taxis = arrayOfThings<Ship>(NUM_TAXIS, () => initShip(game));

    ships.forEach((ship) => {
      game.add(ship);
      ship.actions.repeatForever(trader(stations, ship, game));
    });

    taxis.forEach((ship) => {
      ship.color = Color.Yellow;
      ship.attributes.role = "Taxi";
      ship.actions.repeatForever(taxi(ship, ships));

      game.add(ship);
    });

    stations.forEach((station) => {
      game.add(station);
    });

    let center = getCenterVec(game);
    let { camera } = game.currentScene;

    camera.strategy.camera.zoom = MIN_ZOOM;
    camera.strategy.camera.move(center, 0);

    gameRef.current.start();
  }, []);

  useEffect(() => {
    function updateActors() {
      let game = gameRef.current;

      dispatch({
        type: "update-actors",
        payload: {
          actors: game?.currentScene.actors as Meeple[],
        },
      });
    }

    let interval = setInterval(updateActors, 100);
    return () => clearInterval(interval);
  }, []);

  return {
    dispatch,
    state,
  };
}

function initStation(game: Game, onClick: (id: number) => void): Station {
  let station = new Station();

  station.pos = getRandomScreenPosition(game);
  station.on("pointerdown", () => onClick(station.id));

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
  station.addChild(actor);
  return station;
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
