import { Color, Engine, Timer, vec } from "excalibur";
import { getRandomDestination, randomIntFromInterval } from "../utils/helpers";
import { Destination } from "./destination";
import { Meeple } from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { getDestinationName } from "../utils/get-name";

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

const machine: StateMachine = {
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
};

export class Ship extends Meeple {
  private speed = randomIntFromInterval(10, 20);
  private state: ShipState = "off";

  constructor(options?: { name?: string }) {
    super({
      width: 4,
      height: 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      name: options?.name ?? `${getDestinationName()}`,
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
  /**
   * Dispatch method, which is responsible for determining the next state
   * of the ship based on the current state and the action that was
   * dispatched.
   */
  async dispatch(action: ShipAction) {
    const newState = machine[this.state][action.name] as ShipState;

    if (!newState) {
      throw new Error(
        `Action ${action} is not a valid step from state ${this.state}`
      );
    }

    switch (action.name) {
      case "turn on":
        this.turnOnLights();
        break;
      case "turn off":
        this.turnOffLights();
        break;
      case "go to station":
        this.goToWork();
        break;
      case "trade":
        break;
    }

    this.setState(newState);
  }

  /**
   * Determines the next state of the ship based on the current state and
   * the action that was dispatched
   */
  next() {
    switch (this.state) {
      case "off":
        this.dispatch({
          name: "turn on",
        });
        break;
      case "plotting course":
        this.dispatch({
          name: "go to station",
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

  turnOffLights() {
    this.graphics.opacity = 0.5;
  }

  turnOnLights() {
    this.graphics.opacity = 1;
  }
}
