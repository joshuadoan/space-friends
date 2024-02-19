import { Actor, Color, Engine, Timer, vec } from "excalibur";
import * as blockies from "blockies-ts";
import { getDestinationName } from "../utils/get-name";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { randomBetween } from "../utils/helpers";
import { MAX_ZOOM } from "../consts";
import { ActorKind } from "./ActorKind";
import { Lights } from "./Lights";
import { Status } from "./Status";
import { KindMap } from "./KindMap";

export class Meeple extends Actor {
  public kind: ActorKind = ActorKind.Unknown;
  public status: Status = {
    health: 100,
    stuff: 0,
    lights: Lights.Off,
    imgUrl: blockies.create({ seed: "generic" }).toDataURL(),
    journal: [],
    speed: randomBetween(20, 42),
    target: null,
  };

  startTimer(next: () => void) {
    const timer = new Timer({
      // interval: randomBetween(1000, 1000),
      interval: 1000,
      repeats: true,
    });

    timer.on(() => next());
    this.scene.engine.add(timer);
    timer.start();
  }

  onPostUpdate() {
    switch (this.status.lights) {
      case Lights.On:
        this.graphics.opacity = 1;
        break;
      case Lights.Off:
        this.graphics.opacity = 0.5;
        break;
    }
  }

  getActorsMap(): KindMap {
    return this.scene.actors
      .map((a) => a as Meeple)
      .reduce(
        (acc: KindMap, val: Meeple) => {
          const current = acc[val.kind] ?? [];

          return {
            ...acc,
            [val.kind]: [...current, val],
          };
        },
        {
          [ActorKind.Laborer]: [],
          [ActorKind.SpaceShop]: [],
          [ActorKind.Home]: [],
          [ActorKind.Pirate]: [],
          [ActorKind.Unknown]: [],
        }
      );
  }

  setStatus(status: Partial<Status>) {
    this.status = {
      ...this.status,
      ...status,
    };
  }

  turnOffLights() {
    this.setStatus({
      lights: Lights.Off,
    });
  }

  turnOnLights() {
    this.setStatus({
      lights: Lights.On,
    });
  }

  generateAvatar() {
    return blockies
      .create({ seed: this.name + this.color.toString() + this.id })
      .toDataURL();
  }

  distanceTo(other: Actor) {
    return Math.sqrt(
      Math.pow(this.pos.x - other.pos.x, 2) +
        Math.pow(this.pos.y - other.pos.y, 2)
    );
  }

  isActionComplete() {
    return this.actions.getQueue().isComplete();
  }

  getSpaceSHops() {
    return this.scene.actors
      .filter((a) => {
        return a instanceof SpaceShop;
      })
      .map((a) => a as SpaceShop);
  }

  getRandomDestination(kind: ActorKind) {
    const destinations = this.scene.actors
      .map((a) => a as Meeple)
      .filter((a): a is Meeple => a.kind === kind);

    return destinations[Math.floor(Math.random() * destinations.length)];
  }

  getRandomShip(kind: ActorKind) {
    const ships = this.scene.actors
      .map((a) => a as Meeple)
      .filter((a): a is Meeple => a.kind === kind);

    return ships[Math.floor(Math.random() * ships.length)];
  }

  goToDestination(destination: Meeple) {
    return this.actions
      .moveTo(
        vec(
          destination.pos.x + randomBetween(-10, 10),
          destination.pos.y + randomBetween(-10, 10)
        ),
        this.status.speed
      )
      .callMethod(() => {});
  }
  zoomTo() {
    const camera = this.scene.camera;
    camera.clearAllStrategies();
    camera.strategy.elasticToActor(this, 0.3, 0.3);
    camera.strategy.camera.zoomOverTime(MAX_ZOOM, 5000);
  }

  /**
   * Increases the actor's stuff by the given number.
   * @param number the amount to increase (or decrease) the actor's stuff by
   */
  transact(number: number): void {
    this.setStatus({
      stuff: this.status.stuff + number,
    });
  }
}

export class SpaceShop extends Meeple {
  constructor(options?: { name?: string }) {
    super({
      width: 8,
      height: 8,
      color: Color.Azure,
      name: getDestinationName(),
      ...options,
    });

    this.kind = ActorKind.SpaceShop;
  }
  onInitialize(_engine: Engine): void {
    this.color = Color.Orange;
    this.pos = getRandomScreenPosition(this.scene.engine);
    this.setStatus({
      imgUrl: this.generateAvatar(),
      stuff: 100,
      lights: Lights.On,
      journal: [
        {
          action: "Open",
          state: "open",
          timestamp: Date.now(),
        },
      ],
    });
  }
}
