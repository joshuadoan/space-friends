import { Color, Engine, Timer, vec } from "excalibur";
import { getRandomDestination, randomIntFromInterval } from "../utils/helpers";
import { Destination } from "./destination";
import {
  Lights,
  MeepleClass,
  MeepleKind,
  ShipAction,
  ShipState,
} from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { getDestinationName } from "../utils/get-name";

export const MAX_SPEED = 42;
export const MIN_SPEED = 27;

const colors = [Color.Violet, Color.Viridian, Color.Gray, Color.Orange];

export type StateMachine = {
  [state in ShipState]: {
    [action in ShipAction]?: ShipState;
  };
};

const machine: StateMachine = {
  [ShipState.Off]: {
    [ShipAction.GoHome]: ShipState.TravelingHome,
    [ShipAction.GoToWork]: ShipState.TravelingToWork,
  },
  [ShipState.TravelingToWork]: {
    [ShipAction.Work]: ShipState.Working,
  },
  [ShipState.Working]: {
    [ShipAction.GoHome]: ShipState.TravelingHome,
    [ShipAction.Work]: ShipState.Working,
  },
  [ShipState.TravelingHome]: {
    [ShipAction.Hangout]: ShipState.AtHome,
  },
  [ShipState.AtHome]: {
    [ShipAction.GoToWork]: ShipState.TravelingToWork,
    [ShipAction.Hangout]: ShipState.AtHome,
  },
};

export class Ship extends MeepleClass {
  private speed = randomIntFromInterval(MIN_SPEED, MAX_SPEED);

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

    this.setAvatar(this.color.toString() + this.id + this.name);

    const timer = new Timer({
      interval: randomIntFromInterval(1000, 5000),
      repeats: true,
    });

    timer.on(() => this.next());

    engine.add(timer);
    timer.start();
  }

  onPostUpdate(_engine: Engine, _delta: number): void {
    switch (this.getStatus().lights) {
      case Lights.On:
        this.graphics.opacity = 1;
        break;
      case Lights.Off:
        this.graphics.opacity = 0.5;
        break;
    }
  }

  /**
   * Dispatch method, which is responsible for determining the next state
   * of the ship based on the current state, runs actions, and the action
   * that was dispatched.
   */
  async dispatch(action: ShipAction) {
    const newState = machine[this.getState() as ShipState][action];

    if (!newState) {
      throw new Error(
        `Action ${action} is not a valid step from state ${this.getState()}`
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
      case ShipAction.Hangout:
      case ShipAction.Work:
        this.turnOffLights();
        break;
      default:
        break;
    }

    this.setState(newState);
  }

  /**
   * Determines the next state of the ship based on the current state and
   * the action that was dispatched
   */
  next() {
    if (!this.actions.getQueue().isComplete()) {
      return;
    }

    switch (this.getState()) {
      case ShipState.Off:
        this.dispatch(ShipAction.GoToWork);
        break;
      case ShipState.TravelingToWork:
        this.dispatch(ShipAction.Work);
        break;
      case ShipState.TravelingHome:
        this.dispatch(ShipAction.Hangout);
        break;
      case ShipState.Working:
        this.setStatus({
          ...this.getStatus(),
          stuff: this.getStatus().stuff + 1,
        });
        if (this.getStatus().stuff > 5) {
          this.dispatch(ShipAction.GoHome);
        }
        break;
      case ShipState.AtHome:
        this.setStatus({
          ...this.getStatus(),
          stuff: this.getStatus().stuff - 1,
        });
        if (this.getStatus().stuff < 1) {
          this.dispatch(ShipAction.GoToWork);
        }
        break;
    }
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
        destination.transact(this);
      });
  }
}
