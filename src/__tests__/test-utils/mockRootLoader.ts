import { Destination } from "../../classes/destination";
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
            }),
            new Destination({
              name: "Destination 2",
            }),
          ],
        },
      },
    });
  });
};
