import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  names,
  starWars,
} from "unique-names-generator";

export function getPersonName() {
  return uniqueNamesGenerator({
    dictionaries: [names, starWars, colors, adjectives],
    separator: " ",
    length: 2,
    style: "capital",
  });
}

export function getDestinationName() {
  return uniqueNamesGenerator({
    dictionaries: [names, colors, adjectives],
    separator: " ",
    style: "capital",
    length: 2,
  });
}
