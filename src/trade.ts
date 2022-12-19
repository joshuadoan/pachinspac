import { ActionContext } from "excalibur";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
  languages,
  names,
} from "unique-names-generator";
import { Ship } from "./classes/Ship";
import { Station } from "./classes/Station";
import { shuffle } from "./hooks/useGame";

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
            [
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
            ],
            languages,
            names,
          ]),
          separator: " ",
          length: 6,
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
