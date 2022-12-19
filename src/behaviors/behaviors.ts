import { ActionContext, vec } from "excalibur";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
  languages,
  names,
} from "unique-names-generator";
import { Game } from "../classes/Game";
import { Meeple } from "../classes/Meeple";
import { Ship } from "../classes/Ship";
import { Station } from "../classes/Station";
import { shuffle } from "../hooks/useGame";
import { randomChance } from "../utils";

export function behavior(stations: Station[], ship: Ship, game: Game) {
  return (actions: ActionContext) => {
    switch (ship.attributes.status) {
      case "Idle": {
        if (randomChance()) {
          strand(ship, actions);
          return;
        }
        trade(ship, actions, stations);
        return;
      }
    }
  };
}

function trade(ship: Ship, actions: ActionContext, stations: Station[]) {
  ship.attributes.status = "Traveling";

  let station = stations[Math.floor(Math.random() * stations.length)];
  ship.attributes.destination = station;

  actions
    .meet(ship.attributes.destination, Math.floor(Math.random() * 100) + 50)
    .callMethod(() => {
      ship.attributes.status = "Visiting";
      if (ship.attributes.destination) {
        ship.attributes.destination.attributes.visitors[ship.id] = ship;
      }
      let { chat, punctuation } = getChat(ship);
      ship.attributes.chat = [chat + punctuation];
    })
    .delay(10 * 1000)
    .callMethod(() => {
      if (ship.attributes.destination) {
        ship.attributes.destination.attributes.visitors[ship.id] = null;
      }

      ship.attributes.status = "Idle";
    });
}

function strand(ship: Ship, actions: ActionContext) {
  ship.attributes.destination = null;

  actions
    .moveTo(
      vec(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500)),
      Math.floor(Math.random() * 100) + 50
    )
    .callMethod(() => {
      ship.attributes.status = "Stranded";
    });
}

export function taxi(ship: Ship, ships: Station[]) {
  return (actions: ActionContext) => {
    if (!actions.getQueue().isComplete()) return;

    let stranded = ships.find((ship) => ship.attributes.status === "Stranded");

    if (!stranded || ship.attributes.status === "Picking up") {
      return;
    }

    ship.attributes.status = "Picking up";
    ship.attributes.destination = stranded;

    actions
      .blink(500, 250, 3)
      .meet(stranded, 100)
      .blink(500, 250, 3)
      .callMethod(() => {
        if (!stranded) {
          return;
        }
        stranded.attributes.status = "Idle";
        ship.attributes.status = "Idle";
        ship.attributes.destination = null;
      });
  };
}

function getChat(meeple: Meeple) {
  let chat = uniqueNamesGenerator({
    dictionaries: shuffle([
      adjectives,
      animals,
      colors,
      EMOTICONS,
      languages,
      names,
    ]),
    separator: " ",
    length: 6,
    seed: meeple?.id,
    style: "lowerCase",
  });

  let punctuation = ["?", ".", "...", "!"][
    Math.floor(Math.random() * ["?", ".", "...", "!"].length)
  ];
  return { chat, punctuation };
}

export const EMOTICONS = [
  "😄",
  "😀",
  "🙂",
  "😕",
  "☹️",
  "😴",
  "❓",
  "🕐",
  "🕑",
  "🕒",
  "🕓",
  "🕔",
  "🕕",
  "🕖",
  "🕗",
  "💬",
  "📽️",
  "🌌",
  "👽",
  "👾",
  "🛸",
  "👾",
  "😱",
  "🚀",
  "👀",
  "🔭",
  "🛸",
];
