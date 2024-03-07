import { Color, DisplayMode, Engine, vec, Vector } from "excalibur";
import { ActorBase, DEFAULT_ZOOM } from "./Base";
import { Direction } from "../types";
import { Home } from "./Home";
import { SpaceShop } from "./SpaceShop";
import { Laborer } from "./Laborer";
import { Pirate } from "./Pirate";
import { PirateBase } from "./PirateBase";
import { Star } from "./Star";
import { ActorKind } from "./ActorKind";

export const NUMBER_OF_STARS = 156;
export const NUMBER_OF_SPACE_SHOPS = 5;
export const NUMBER_OF_SPACE_HOMES = 2;
export const NUMBER_OF_SHIPS = 42;
export const NUMBER_OF_PIRATES = 3;
export const NUMBER_OF_PIRATE_BASES = 1;

/**
 * Resets the zoom of the camera.
 */
class Game extends Engine {
  public actors: ActorBase[] = [];
  constructor() {
    super({
      displayMode: DisplayMode.FillScreen,
      backgroundColor: Color.Black,
      canvasElementId: "canvas",
      antialiasing: false,
    });
  }
  onInitialize(_engine: Engine): void {
    for (let i = 0; i < NUMBER_OF_STARS; i++) {
      const star = new Star();
      this.add(star);
    }

    for (let i = 0; i < NUMBER_OF_SPACE_HOMES; i++) {
      const ship = new Home();
      this.add(ship);
    }

    for (let i = 0; i < NUMBER_OF_SPACE_SHOPS; i++) {
      const ship = new SpaceShop();
      this.add(ship);
    }

    for (let i = 0; i < NUMBER_OF_SHIPS; i++) {
      const ship = new Laborer();
      this.add(ship);
    }

    for (let i = 0; i < NUMBER_OF_PIRATES; i++) {
      const ship = new Pirate();
      this.add(ship);
    }

    for (let i = 0; i < NUMBER_OF_PIRATE_BASES; i++) {
      const ship = new PirateBase();
      this.add(ship);
    }

    const kindOrder = Object.values(ActorKind);

    this.actors =
      this.currentScene.actors
        .map((a) => a as ActorBase)
        .sort((a, b) => {
          const aIndex = kindOrder.indexOf(a.kind);
          const bIndex = kindOrder.indexOf(b.kind);

          if (aIndex < bIndex) {
            return -1;
          }
          return 0;
        }) ?? [];
  }

  panTo(pos: Vector) {
    this.currentScene.camera.move(pos, 1000);
  }
  zoomOut() {
    const camera = this.currentScene.camera;
    camera.strategy.camera.zoomOverTime(DEFAULT_ZOOM, 500);
  }
  panCamera(direction: Direction) {
    const { camera } = this.currentScene;
    camera.clearAllStrategies();

    const duration = 1;
    switch (direction) {
      case Direction.Up:
        camera.move(vec(camera.pos.x, camera.pos.y - 20), duration);
        break;
      case Direction.Down:
        camera.move(vec(camera.pos.x, camera.pos.y + 20), duration);

        break;
      case Direction.Left:
        camera.move(vec(camera.pos.x - 20, camera.pos.y), duration);
        break;
      case Direction.Right:
        camera.move(vec(camera.pos.x + 20, camera.pos.y), duration);

        break;
    }
  }
  getRandomScreenPosition() {
    enum BOUNDS {
      MIN_X = -500000,
      MAX_X = 500000,
      MIN_Y = -500000,
      MAX_Y = 500000,
    }

    return vec(
      Math.floor(Math.random() * (BOUNDS.MAX_X - BOUNDS.MIN_X) + BOUNDS.MIN_X) *
        this.currentScene.camera.zoom,
      Math.floor(Math.random() * (BOUNDS.MAX_Y - BOUNDS.MIN_Y) + BOUNDS.MIN_Y) *
        this.currentScene.camera.zoom
    );
  }
}
export default Game;
