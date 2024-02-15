import { Actor, Color, Engine, Timer, vec } from "excalibur";
import * as blockies from "blockies-ts";
import { getDestinationName, getPersonName } from "../utils/get-name";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { randomIntFromInterval } from "../utils/helpers";
import Game from "./game";
import { MAX_ZOOM } from "../consts";

export enum ActorKind {
  Laborer = "laborer",
  SpaceShop = "space-shop",
  Home = "home",
}

export enum Lights {
  On = "on",
  Off = "off",
}

export type Event = {
  timestamp: number;
  action: string;
  state: string;
};

export type Journal = Event[];

export type Status = {
  health: number;
  stuff: number;
  lights: Lights;
  imgUrl: string;
  journal: Event[];
};

export class Base extends Actor {
  public kind: ActorKind = ActorKind.Laborer;
  public status: Status = {
    health: 100,
    stuff: 0,
    lights: Lights.Off,
    imgUrl: blockies.create({ seed: "generic" }).toDataURL(),
    journal: [],
  };

  startTimer(next: () => void) {
    const timer = new Timer({
      interval: randomIntFromInterval(1000, 3000),
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

  getHomes() {
    return this.scene.actors
      .filter((a) => {
        return a instanceof Home;
      })
      .map((a) => a as Home);
  }

  getRandomDestination(kind: ActorKind) {
    const destinations = this.scene.actors
      .map((a) => a as Destination)
      .filter((a): a is Destination => a.kind === kind);

    return destinations[Math.floor(Math.random() * destinations.length)];
  }

  goToDestination(destination: Destination) {
    return this.actions
      .moveTo(
        vec(
          destination.pos.x + randomIntFromInterval(-10, 10),
          destination.pos.y + randomIntFromInterval(-10, 10)
        ),
        42
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

export class Ship extends Base {
  constructor(options?: { name?: string }) {
    super({
      width: 4,
      height: 2,
      color: Color.Yellow,
      name: getPersonName(),
      ...options,
    });
  }
}

export class Destination extends Base {
  constructor(options?: { name?: string }) {
    super({
      width: 8,
      height: 8,
      color: Color.Azure,
      name: getDestinationName(),
      ...options,
    });
  }
}

export class SpaceShop extends Destination {
  onInitialize(_engine: Engine): void {
    this.kind = ActorKind.SpaceShop;
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
export class Home extends Destination {
  onInitialize(_engine: Game): void {
    this.kind = ActorKind.Home;
    this.pos = getRandomScreenPosition(this.scene.engine);
    this.setStatus({
      imgUrl: this.generateAvatar(),
      stuff: 100,
      lights: Lights.On,
      journal: [
        {
          action: "open",
          state: "cozy",
          timestamp: Date.now(),
        },
      ],
    });
  }
}
