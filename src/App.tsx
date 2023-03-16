import { useState } from "react";
import randomName from "@scaleway/random-name";
import { Actor, Color, Vector } from "excalibur";
import { useEffect, useRef } from "react";
import { Game } from "./classes/Game";
import { getRandomScreenPosition } from "./utils";
import "./App.css";

const NUM_SHIPS = 20;
const NUM_MEEPLES = 25;
const NUM_STATIONS = 5;

type Kind = "station" | "ship" | "meeple";

type Things = {
  actor: Actor;
  name: string;
  kind: Kind;
  id: number;
};

type Station = Things & {
  merchant?: Meeple;
  visitors: Ship[];
};

type Ship = Things & {
  pilot?: Meeple;
};

type MeepleRoles = "pilot" | "merchant" | "unknown";

type Meeple = Things & {
  role: MeepleRoles;
};

function App() {
  let gameRef = useRef<Game | null>(null);

  let [state, setState] = useState<{
    isLoaded: boolean;
    meeples: Meeple[];
    ships: Ship[];
    stations: Station[];
  }>({
    isLoaded: false,
    meeples: [],
    ships: [],
    stations: [],
  });

  useEffect(function initGame() {
    let game = new Game();

    let meeples: Meeple[] = [];

    let stations: Station[] = [...Array(NUM_STATIONS)].map(() => {
      let pos = getRandomScreenPosition(game);
      let pilot = initMeeple({
        pos,
        role: "merchant"
      });
      return initStation({
        pos,
      });
    });

    let ships: Ship[] = [...Array(NUM_SHIPS)].map(() =>
      initShip({
        pos: getRandomScreenPosition(game),
      })
    );

    // let meeples: Meeple[] = [...Array(NUM_MEEPLES)].map(() => {
    //   function getRole(stations: Station[]): {
    //     role: MeepleRoles;
    //     employer?: Station;
    //   } {
    //     const emptyStation = stations.find((s) => !s.merchant);

    //     if (emptyStation) {
    //       return {
    //         role: "merchant",
    //         employer: emptyStation,
    //       };
    //     }

    //     return {
    //       role: "unknown",
    //     };
    //   }

    //   return initMeeple({
    //     pos: getRandomScreenPosition(game),
    //     role: getRole(stations),
    //   });
    // });

    [...ships, ...stations].forEach((s) => game.add(s.actor));

    setState((prev) => ({
      ...prev,
      ships,
      stations,
      isLoaded: true,
    }));

    game.start();
    gameRef.current = game;
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {state.isLoaded && (
        <nav className=" bg-green-900 w-96">
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

function getActorColor(kind: Kind) {
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

function initStation({ pos }: { pos: Vector }): Station {
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
    kind: "station",
    id: station.id,
  };
}

function initShip({ pos }: { pos: Vector }): Ship {
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
    kind: "ship",
    id: ship.id,
  };
}

function initMeeple({ pos, role }: { pos: Vector; role?: Me }): Meeple {
  let meeple = new Actor({
    pos,
    color: Color.Cyan,
    width: 8,
    height: 8,
    name: randomName(),
  });

  return {
    actor: meeple,
    name: meeple.name,
    kind: "meeple",
    role: "unknown",
    id: meeple.id,
  };
}

export default App;
