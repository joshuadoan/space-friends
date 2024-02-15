import { Home, Ship, SpaceShop } from "../../classes/base";

export default async () => {
  return new Promise((resolve) => {
    resolve({
      game: {
        currentScene: {
          actors: [
            new Ship({
              name: "Meeple 1",
            }),
            new Ship({
              name: "Meeple 2",
            }),
            new Ship({
              name: "Meeple 3",
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
