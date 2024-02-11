import { Color, Engine, Timer, vec } from "excalibur";
import { getRandomDestination, randomIntFromInterval } from "../utils/helpers";
import { Destination } from "./destination";
import { Meeple, MeepleKind } from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { getDestinationName } from "../utils/get-name";

const colors = [Color.Violet, Color.Viridian, Color.Gray, Color.Orange];

export enum ShipState {
  PlottingCourse = "plotting course",
  TravelingToWork = "traveling to work",
  TravelingHome = "traveling home",
  Working = "working",
  AtHome = "chilling at home",
}

export enum ShipAction {
  GoToWork = "go to work",
  StartWorking = "start working",
  FinishWorking = "finish working",
  GoHome = "go home",
  StartHome = "start chilling at home",
  FinishHome = "finish finish chilling home",
}

export type StateMachine = {
  [state in ShipState]: {
    [action in ShipAction]?: ShipState;
  };
};

const machine: StateMachine = {
  [ShipState.PlottingCourse]: {
    [ShipAction.GoToWork]: ShipState.TravelingToWork,
    [ShipAction.GoHome]: ShipState.TravelingHome,
  },
  [ShipState.TravelingToWork]: {
    [ShipAction.StartWorking]: ShipState.Working,
  },
  [ShipState.Working]: {
    [ShipAction.FinishWorking]: ShipState.PlottingCourse,
  },
  [ShipState.TravelingHome]: {
    [ShipAction.StartHome]: ShipState.AtHome,
  },
  [ShipState.AtHome]: {
    [ShipAction.FinishHome]: ShipState.PlottingCourse,
  },
};

export class Ship extends Meeple {
  private speed = randomIntFromInterval(50, 200);
  private state: ShipState = ShipState.PlottingCourse;
  private previousState: ShipState = ShipState.PlottingCourse;

  constructor(options?: { name?: string }) {
    super({
      width: 4,
      height: 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      name: options?.name ?? `${getDestinationName()}`,
    });
  }

  onInitialize(engine: Engine): void {
    this.addTag(MeepleKind.SpaceLaborer);
    this.pos = getRandomScreenPosition(engine);
    this.turnOffLights();

    this.setAvatar(this.color.toString() + this.id + this.name);
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
        this.goToDestination(MeepleKind.SpaceShop);
        break;
      case ShipAction.GoHome:
        this.turnOnLights();
        this.goToDestination(MeepleKind.Home);
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
        switch (this.previousState) {
          case "working":
            this.dispatch(ShipAction.GoHome);
            break;
          case "chilling at home":
            this.dispatch(ShipAction.GoToWork);
            break;
          default:
            this.dispatch(ShipAction.GoHome);
            break;
        }
        break;
      case "traveling to work":
        break;
      case "working":
        this.dispatch(ShipAction.FinishWorking);
        break;
      case "traveling home":
        break;
      case "chilling at home":
        this.dispatch(ShipAction.FinishHome);
        break;
    }
  }

  getState(): ShipState {
    return this.state;
  }

  setState(state: ShipState) {
    this.previousState = this.state;
    this.state = state;
  }

  getDestination(type: MeepleKind = MeepleKind.SpaceShop) {
    return getRandomDestination(
      this.scene.engine.currentScene.actors
        .filter((a) => {
          return a instanceof Destination && a.hasTag(type);
        })
        .map((a) => a as Destination)
    );
  }

  goToDestination(type?: MeepleKind) {
    const destination = this.getDestination(type);

    this.actions
      .moveTo(
        vec(
          destination.pos.x + randomIntFromInterval(-10, 10),
          destination.pos.y + randomIntFromInterval(-10, 10)
        ),
        this.speed
      )
      .callMethod(() => {
        switch (type) {
          case MeepleKind.SpaceShop:
            this.dispatch(ShipAction.StartWorking);
            break;
          case MeepleKind.SpaceLaborer:
          default:
            this.dispatch(ShipAction.StartHome);
            break;
        }
      });
  }

  turnOffLights() {
    this.graphics.opacity = 0.5;
  }

  turnOnLights() {
    this.graphics.opacity = 1;
  }
}
