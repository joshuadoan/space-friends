import { Destination } from "../../classes/destination";
import { MeepleKind } from "../../types";
import { Ship } from "../../classes/ship";

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
            new Destination({
              name: "Destination 1",
              kind: MeepleKind.SpaceShop,
            }),
            new Destination({
              name: "Destination 2",
              kind: MeepleKind.SpaceShop,
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
