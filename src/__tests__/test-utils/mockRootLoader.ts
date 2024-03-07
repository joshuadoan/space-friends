import { SpaceShop } from "../../classes/SpaceShop";
import { Home } from "../../classes/Home";
import { Laborer } from "../../classes/Laborer";
import { Camera } from "excalibur";

export default async (): Promise<{
  game: any;
}> => {
  return new Promise((resolve) => {
    resolve({
      game: {
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
        currentScene: {
          camera: new Camera(),
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
        zoomOut: jest.fn(),
      },
    });
  });
};
