import { Color, DisplayMode, Engine, vec, Vector } from "excalibur";
import { DEFAULT_ZOOM } from "./Base";
import { Direction } from "../types";
import { Home } from "./Home";
import { SpaceShop } from "./SpaceShop";
import { Laborer } from "./Laborer";
import { Pirate } from "./Pirate";
import { PirateBase } from "./PirateBase";
import { Star } from "./Star";

export const NUMBER_OF_STARS = 156;
export const NUMBER_OF_SPACE_SHOPS = 10;
export const NUMBER_OF_SPACE_HOMES = 5;
export const NUMBER_OF_SHIPS = 42;
export const NUMBER_OF_PIRATES = 9;
export const NUMBER_OF_PIRATE_BASES = 3;

/**
 * Resets the zoom of the camera.
 */
class Game extends Engine {
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
  }

  panTo(pos: Vector) {
    this.currentScene.camera.move(pos, 1000);
  }
  resetZoom() {
    this.zoomOut();
    const center = vec(
      (this.drawWidth / 2) * this.currentScene.camera.zoom,
      (this.drawHeight / 2) * this.currentScene.camera.zoom
    );
    const camera = this.currentScene.camera;
    camera.clearAllStrategies();
    camera.strategy.camera.move(center, 500);
  }
  zoomOut() {
    const camera = this.currentScene.camera;
    camera.strategy.camera.zoomOverTime(DEFAULT_ZOOM, 500);
  }
  panCamera(direction: Direction) {
    const { camera } = this.currentScene;
    camera.clearAllStrategies();

    const duration = 10;
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
    let maxX = this.drawWidth * 1.5;
    let maxY = this.drawHeight * 1.5;
    let minY = this.drawHeight * 1.5;
    let minX = this.drawWidth * 1.5;

    return vec(
      Math.floor(Math.random() * (maxX - minX) + minX) *
        this.currentScene.camera.zoom,
      Math.floor(Math.random() * (maxY - minY) + minY) *
        this.currentScene.camera.zoom
    );
  }
}
export default Game;
