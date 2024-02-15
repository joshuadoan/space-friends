import { Home, SpaceShop } from "../../classes/base";
import { Laborer } from "../../classes/laborer";

export default async () => {
  return new Promise((resolve) => {
    resolve({
      game: {
        currentScene: {
          actors: [
            new Laborer({
              name: "Meeple 1",
            }),
            new Laborer({
              name: "Meeple 2",
            }),
            new Laborer({
              name: "Meeple 3",
            }),
            new SpaceShop({
              name: "Destination 1",
            }),
            new SpaceShop({
              name: "Destination 1",
            }),
            new Home({
              name: "Destination 2",
            }),
          ],
        },
        isRunning: jest.fn().mockImplementation(() => true),
        start: jest.fn(),
        stop: jest.fn(),
        resetZoom: jest.fn(),
      },
    });
  });
};
