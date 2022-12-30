import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  colors,
  languages,
  names,
} from "unique-names-generator";
import { shuffle } from "../utils/shuffle";
import { EMOTICONS } from "./behaviors";

export function getChat(number: number) {
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
    seed: number,
    style: "lowerCase",
  });

  let punctuation = ["?", ".", "...", "!"][
    Math.floor(Math.random() * ["?", ".", "...", "!"].length)
  ];
  return { chat, punctuation };
}
