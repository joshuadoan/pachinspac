import { useState } from "react";
import randomName from "@scaleway/random-name";
import { Actor, Color, Vector } from "excalibur";
import { useEffect, useRef } from "react";
import { Game } from "./classes/Game";
import { getRandomScreenPosition } from "./utils";
import "./App.css";

const NUM_SHIPS = 20;
const NUM_STATIONS = 5;

type Role = "station" | "ship" | "meeple";
type ShipStatus = "idle" | "traveling";

type Thing = {
  actor: Actor;
  id: number;
  role: Role;
  name: string;
  status: ShipStatus;
  visitors: Thing[];
};

function App() {
  let gameRef = useRef<Game | null>(null);

  let [state, setState] = useState<{
    isLoaded: boolean;
    ships: Thing[];
    stations: Thing[];
  }>({
    isLoaded: false,
    ships: [],
    stations: [],
  });

  useEffect(function initGame() {
    let game = new Game();

    let stations: Thing[] = [...Array(NUM_STATIONS)].map(() => {
      let pos = getRandomScreenPosition(game);
      let station = initStation({
        pos,
      });

      return station;
    });

    let ships: Thing[] = [...Array(NUM_SHIPS)].map(() =>
      initShip({
        pos: getRandomScreenPosition(game),
      })
    );

    [...ships, ...stations].forEach((s) => game.add(s.actor));

    setState((prev) => ({
      ...prev,
      ships,
      stations,
      isLoaded: true,
    }));

    game.start();
    gameRef.current = game;
    console.log("start");
  }, []);

  useEffect(function () {
    const interval = setInterval(() => {
      state.ships.forEach((ship, i) => {
        switch (ship.status) {
          case "idle": {
            ship.actor.actions.meet(
              getRandomFromList<Thing>(state.stations).actor,
              50
            );

            return;
          }
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {state.isLoaded && (
        <nav className=" bg-black w-96">
          <ul className="space-y-2 p-2 overflow-auto h-full">
            {[...state.stations, ...state.ships].map(function renderNames(
              s,
              i
            ) {
              return (
                <li
                  key={i}
                  style={{
                    color: String(s.actor.color),
                  }}
                >
                  <header>{s.name}</header>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <canvas id="pepper" />
    </div>
  );
}

function getRandomFromList<L>(list: Array<L>) {
  return list[Math.floor(Math.random() * list.length)];
}

function getActorColor(kind: Role) {
  switch (kind) {
    case "meeple": {
      return Color.Gray;
    }
    case "ship": {
      return Color.Cyan;
    }
    case "station": {
      return Color.Orange;
    }
  }
}

function initStation({ pos }: { pos: Vector }): Thing {
  let station = new Actor({
    pos,
    color: getActorColor("station"),
    width: 8,
    height: 8,
    name: randomName(),
  });

  return {
    actor: station,
    name: station.name,
    visitors: [],
    role: "station",
    id: station.id,
    status: "idle",
  };
}

function initShip({ pos }: { pos: Vector }): Thing {
  let ship = new Actor({
    pos,
    color: Color.Cyan,
    width: 8,
    height: 8,
    name: randomName(),
  });

  return {
    actor: ship,
    name: ship.name,
    role: "ship",
    id: ship.id,
    status: "idle",
    visitors: [],
  };
}

export default App;
