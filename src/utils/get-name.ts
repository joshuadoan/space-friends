import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  names,
  starWars,
  animals,
} from "unique-names-generator";
import { randomFromArray } from "./helpers";

export function getPersonName() {
  return uniqueNamesGenerator({
    dictionaries: [
      randomFromArray([starWars, names]),
      randomFromArray([starWars, names]),
    ],
    separator: " ",
    length: 2,
    style: "capital",
  });
}

export function getSpaceBarName() {
  return uniqueNamesGenerator({
    dictionaries: [randomFromArray([colors, adjectives]), animals],
    separator: " ",
    style: "capital",
    length: 2,
  });
}
