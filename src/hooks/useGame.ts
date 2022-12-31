import { useEffect, useReducer, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Game } from "../classes/Game";
import name from "@scaleway/random-name";
import { getCenterVec, getRandomScreenPosition, isMeeple } from "../utils";
import { Meeple } from "../classes/Meeple";
import { zoomOutToPoint, zoomToSelected } from "../utils/cameraUtils";
import { reducer } from "./reducer";
import { Color } from "excalibur";
import { names, uniqueNamesGenerator } from "unique-names-generator";
import { MeepleColors } from "../consts";

const NUM_TRADERS = 24;
const NUM_STATIONS = 6;
const NUM_REPAIR = 1;

let defaultState = {
  isPaused: false,
  actors: [],
  filters: {
    trader: true,
    station: true,
    repair: true,
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

    // Stations for trading
    [...Array(NUM_STATIONS)].forEach(() => {
      let station = new Meeple({
        pos: getRandomScreenPosition(game),
        color: Color.Orange,
      });
      station.role = "station";
      station.showLabel = true;
      station.on("pointerdown", () => navigate("/" + station.id));
      game.add(station);
    });

    // Traders
    [...Array(NUM_TRADERS)].forEach(() => {
      let randomName = uniqueNamesGenerator({
        dictionaries: [names, [name("", " ")]],
        separator: " ",
        length: 2,
      });

      let ship = new Meeple({
        pos: getRandomScreenPosition(game),
        color: MeepleColors[Math.floor(Math.random() * MeepleColors.length)],
        name: randomName,
      });

      ship.role = "trader";
      ship.on("pointerdown", () => navigate("/" + ship.id));
      ship.trade(
        game.currentScene.actors
          .filter(isMeeple)
          .filter((m) => m.role === "station")
      );
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
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!gameRef.current) return;

    if (state.selected) {
      zoomToSelected(state.selected, gameRef.current.currentScene.camera);
    } else {
      let center = getCenterVec(gameRef.current);
      zoomOutToPoint(gameRef.current.currentScene.camera, center);
    }
  }, [state.selected]);

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
  }, [id]);

  return {
    dispatch,
    state,
  };
}

export default useGame;
