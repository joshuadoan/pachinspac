import { useEffect, useReducer, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Game } from "../classes/Game";
import { Ship, Maintenance } from "../classes/Ship";
import { Station } from "../classes/Station";
import {
  getCenterVec,
  getRandomScreenPosition,
  isMeeple,
  isStation,
} from "../utils";
import { Meeple } from "../classes/Meeple";
import { zoomOutToPoint, zoomToSelected } from "../utils/cameraUtils";
import { reducer } from "./reducer";

const NUM_SHIPS = 42;
const NUM_STATIONS = 14;
const NUM_MAINTENANCE = 1;

let defaultState = {
  isPaused: false,
  actors: [],
  filters: {
    Trader: true,
    Station: true,
    Maintenance: true,
  },
  selected: null,
  sidebarIsOpen: false,
};

function useGame() {
  let navigate = useNavigate();
  let { id } = useParams();
  let gameRef = useRef<Game | null>(null);

  let [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    let game = new Game();

    [...Array(NUM_STATIONS)].forEach(() => {
      let station = new Station();
      station.on("pointerdown", () => navigate("/" + station.id));
      game.add(station);
    });

    [...Array(NUM_SHIPS)].forEach(function () {
      let ship = new Ship();
      ship.pos = getRandomScreenPosition(game);
      ship.on("pointerdown", () => navigate("/" + ship.id));
      ship.trade(game.currentScene.actors.filter(isMeeple).filter(isStation));
      game.add(ship);
    });

    [...Array(NUM_MAINTENANCE)].forEach(function () {
      let ship = new Maintenance();
      ship.pos = getRandomScreenPosition(game);
      game.add(ship);
    });

    game.start();
    gameRef.current = game;

    // Update actors state on interval
    let interval = setInterval(function () {
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
    if (!gameRef.current) return;
    let meeples = gameRef.current?.currentScene.actors.filter(isMeeple);
    let selected = meeples?.find((a) => a.id === Number(id)) ?? null;

    if (selected) {
      zoomToSelected(selected, gameRef.current.currentScene.camera);
    } else {
      let center = getCenterVec(gameRef.current);
      zoomOutToPoint(gameRef.current.currentScene.camera, center);
    }

    dispatch({
      type: "set-selected",
      payload: {
        selected,
      },
    });
  }, [id]);

  return {
    dispatch,
    state,
  };
}

export default useGame;
