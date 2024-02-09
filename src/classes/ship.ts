import { Color, Engine, Timer, vec } from "excalibur";
import { getRandomDestination, randomIntFromInterval } from "../utils/helpers";
import { Destination } from "./destination";
import { Meeple } from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { getDestinationName } from "../utils/get-name";

const colors = [Color.Violet, Color.Viridian, Color.Gray, Color.Orange];

export enum ShipState {
  PlottingCourse = "plotting course",
  TravelingToWork = "traveling to work",
  Working = "working",
}

export enum ShipAction {
  GoToWork = "go to work",
  StartWorking = "start working",
  FinishWorking = "finish working",
}

export type StateMachine = {
  [state in ShipState]: {
    [action in ShipAction]?: ShipState;
  };
};

const machine: StateMachine = {
  [ShipState.PlottingCourse]: {
    [ShipAction.GoToWork]: ShipState.TravelingToWork,
  },
  [ShipState.TravelingToWork]: {
    [ShipAction.StartWorking]: ShipState.Working,
  },
  [ShipState.Working]: {
    [ShipAction.FinishWorking]: ShipState.PlottingCourse,
  },
};

export class Ship extends Meeple {
  private speed = randomIntFromInterval(27, 37);
  private state: ShipState = ShipState.PlottingCourse;

  constructor(options?: { name?: string }) {
    super({
      width: 4,
      height: 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      name: options?.name ?? `${getDestinationName()}`,
    });
  }

  onInitialize(engine: Engine): void {
    this.pos = getRandomScreenPosition(engine);
    this.turnOffLights();

    const timer = new Timer({
      interval: randomIntFromInterval(3000, 10000),
      repeats: true,
    });

    timer.on(() => this.next());

    engine.add(timer);
    timer.start();
  }

  /**
   * Dispatch method, which is responsible for determining the next state
   * of the ship based on the current state, runs actions, and the action
   * that was dispatched.
   */
  async dispatch(action: ShipAction) {
    const newState = machine[this.state][action] as ShipState;

    if (!newState) {
      throw new Error(
        `Action ${action} is not a valid step from state ${this.state}`
      );
    }
    this.setJournal(action);

    switch (action) {
      case ShipAction.GoToWork:
        this.turnOnLights();
        this.goToWork();
        break;
      case ShipAction.StartWorking:
        this.turnOffLights();
        break;
      case ShipAction.FinishWorking:
        this.turnOnLights();
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
      case "plotting course":
        this.dispatch(ShipAction.GoToWork);
        break;
      case "traveling to work":
        break;
      case "working":
        this.dispatch(ShipAction.FinishWorking);
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
        this.dispatch(ShipAction.StartWorking);
      });
  }

  turnOffLights() {
    this.graphics.opacity = 0.5;
  }

  turnOnLights() {
    this.graphics.opacity = 1;
  }
}
