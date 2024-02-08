import { Color, Engine, Timer, vec } from "excalibur";
import { getRandomDestination, randomIntFromInterval } from "../utils/helpers";
import { Destination } from "./destination";
import { Meeple } from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";

const colors = [Color.Violet, Color.Viridian, Color.Gray, Color.Orange];

export type ShipState =
  | "off"
  | "plotting course"
  | "traveling to destination"
  | "working";

export type ShipActions = "turn on" | "turn off" | "go to station" | "trade";

export type ShipAction = {
  name: ShipActions;
  action?: () => void;
};

export type StateMachine = {
  [state in ShipState]: {
    [action in ShipActions]?: ShipState;
  };
};

export class Ship extends Meeple {
  private speed = randomIntFromInterval(10, 20);
  private state: ShipState = "off";

  constructor() {
    super({
      width: 4,
      height: 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  onInitialize(engine: Engine): void {
    this.graphics.opacity = 0.5;
    this.pos = getRandomScreenPosition(engine);

    const timer = new Timer({
      interval: randomIntFromInterval(300, 10000),
      repeats: true,
    });

    timer.on(() => this.next());

    engine.add(timer);
    timer.start();
  }

  async dispatch(action: ShipAction) {
    const newState = {
      ["off"]: {
        ["turn on"]: "plotting course",
      },
      ["plotting course"]: {
        ["go to station"]: "traveling to destination",
        ["turn off"]: "off",
      },
      "traveling to destination": {
        ["turn off"]: "off",
        ["trade"]: "working",
      },
      working: {
        "turn off": "off",
      },
    }[this.state][action.name] as ShipState;

    if (!newState) {
      throw new Error(
        `Action ${action} is not a valid step from state ${this.state}`
      );
    }

    if (action.action) {
      action.action();
    }
    this.setState(newState);
  }

  setName(name: string) {
    this.owner.name = name;
  }

  getState(): ShipState {
    return this.state;
  }

  setState(state: ShipState) {
    this.state = state;
  }

  getDestination() {
    return getRandomDestination(
      this.scene.engine.currentScene.actors
        .filter((a) => a instanceof Destination)
        .map((a) => a as Destination)
    );
  }

  goToWork() {
    const destination = this.getDestination();

    this.actions
      .moveTo(
        vec(
          destination.pos.x + randomIntFromInterval(-10, 10),
          destination.pos.y + randomIntFromInterval(-10, 10)
        ),
        this.speed
      )
      .callMethod(() => {
        this.dispatch({
          name: "trade",
        });
      });
  }

  next() {
    this.handleLights();
    switch (this.state) {
      case "off":
        this.dispatch({
          name: "turn on",
        });
        break;
      case "plotting course":
        this.dispatch({
          name: "go to station",
          action: () => this.goToWork(),
        });
        break;
      case "traveling to destination":
        break;
      case "working":
        this.dispatch({
          name: "turn off",
        });
        break;
    }
  }

  handleLights() {
    switch (this.state) {
      case "off":
        this.graphics.opacity = 0.5;
        break;
      case "plotting course":
        this.graphics.opacity = 1;
        break;
      case "traveling to destination":
        this.graphics.opacity = 1;
        break;
      case "working":
        this.graphics.opacity = 0.5;
        break;
    }
  }
}
