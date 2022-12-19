import {
  ActionContext,
  Color,
  Font,
  FontUnit,
  vec,
  Text,
  Actor,
  CollisionType,
  BoundingBox,
} from "excalibur";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
  countries,
  languages,
  names,
  starWars,
} from "unique-names-generator";
import { useEffect, useReducer, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Game } from "../classes/Game";
import { Ship } from "../classes/Ship";
import { Station } from "../classes/Station";
import { arrayOfThings, getRandomScreenPosition, isMeeple } from "../utils";
import { Event, State } from "../types";
import { Meeple } from "../classes/Meeple";

const MIN_ZOOM = 1;
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
    let boundingBox = new BoundingBox(
      0,
      0,
      gameRef.current?.canvas.width,
      gameRef.current?.canvas.height
    );
    game.currentScene.camera.strategy.limitCameraBounds(boundingBox);

    let center = getCenterVec(game);
    game.currentScene.camera.strategy.camera.move(center, 0);
    game.currentScene.camera.strategy.camera.zoom = MIN_ZOOM;
  }

  function initActors(game: Game) {
    let stations = arrayOfThings<Station>(NUM_STATIONS, initStation);
    let ships = arrayOfThings<Ship>(NUM_SHIPS, () => initShip(game));

    ships.forEach((ship) => {
      game.add(ship);
      ship.actions.repeatForever(trade(stations, ship));
      ship.on("pointerdown", () => {
        navigate("/" + ship.id);
      });
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
    console.log(gameRef.current.canvasWidth);
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
  useEffect(() => {
    let interval = setInterval(() => {
      window.localStorage.setItem("pachinspac", JSON.stringify(state.actors));
    }, 1000);

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

export function trade(stations: Station[], ship: Ship) {
  return (actions: ActionContext) => {
    if (!actions.getQueue().isComplete()) return;
    let station = stations[Math.floor(Math.random() * stations.length)];
    ship.attributes.destination = station;
    ship.attributes.status = "Traveling";

    actions
      .meet(station, Math.floor(Math.random() * 100) + 50)
      .callMethod(() => {
        if (!ship.attributes.destination) {
          return;
        }
        ship.attributes.destination.attributes.visitors[ship.id] = ship;
        ship.attributes.status = "Visiting";

        let chat = uniqueNamesGenerator({
          dictionaries: shuffle([
            adjectives,
            animals,
            colors,
            languages,
            names,
          ]),
          separator: " ",
          length: 5,
          seed: ship?.id,
          style: "lowerCase",
        });

        let punctuation = ["?", ".", "...", "!"][
          Math.floor(Math.random() * ["?", ".", "...", "!"].length)
        ];

        ship.attributes.chat = [chat + punctuation];
      })
      .delay(Math.floor(Math.random() * 30000))
      .callMethod(() => {
        if (!ship.attributes.destination) {
          return;
        }
        ship.attributes.destination.attributes.visitors[ship.id] = null;
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

function shuffle(array: any[]) {
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
