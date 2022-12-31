import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

export function randomName() {
  return uniqueNamesGenerator({
    dictionaries: [
      ["The", "Ye", "Gr'Z"],
      [...adjectives, ...colors],
      [...animals],
    ],
    separator: " ",
    length: 3,
    style: "capital",
  });
}
