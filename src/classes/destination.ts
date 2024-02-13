import { Color, Engine, Timer } from "excalibur";
import { getDestinationName } from "../utils/get-name";
import { MeepleClass } from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { randomIntFromInterval } from "../utils/helpers";
import { DestinationAction, DestinationState, MeepleKind } from "../types";

export type Transitions = {
  [state in DestinationState]: {
    [action in DestinationAction]?: DestinationState;
  };
};

const machine: Transitions = {
  [DestinationState.Open]: {
    [DestinationAction.Close]: DestinationState.Closed,
  },
  [DestinationState.Closed]: {
    [DestinationAction.Open]: DestinationState.Open,
  },
};

export class Destination extends MeepleClass {
  constructor(options: { name?: string; kind: MeepleKind; color?: Color }) {
    super({
      width: 8,
      height: 8,
      color: options.color ?? Color.ExcaliburBlue,
      name: options?.name ?? `The ${getDestinationName()}`,
    });

    this.addTag(options.kind);
  }

  onInitialize(engine: Engine): void {
    this.pos = getRandomScreenPosition(engine);
    this.setAvatar(this.color.toString() + this.id + this.name);
    this.setState(DestinationState.Open);
    this.setStatus({
      ...this.getStatus(),
      stuff: 100,
    });
    this.turnOnLights();

    const timer = new Timer({
      interval: randomIntFromInterval(1000, 5000),
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
  async dispatch(action: DestinationAction) {
    const newState = machine[this.getState() as DestinationState][action];

    if (!newState) {
      throw new Error(
        `Action ${action} is not a valid step from state ${this.getState()}`
      );
    }
    this.setJournal(action);

    switch (action) {
      case DestinationAction.Open:
        this.turnOnLights();
        break;
      case DestinationAction.Close:
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
      case DestinationState.Open:
        if (this.getStatus().stuff < 1) {
          this.dispatch(DestinationAction.Close);
        }
        break;
      case DestinationState.Closed:
        this.setStatus({
          ...this.getStatus(),
          stuff: this.getStatus().stuff + 1,
        });
        if (this.getStatus().stuff > 99) {
          this.dispatch(DestinationAction.Open);
        }

        break;
    }
  }

  transact(meeple: MeepleClass) {
    if (this.hasTag(MeepleKind.SpaceShop)) {
      this.setStatus({
        ...this.getStatus(),
        stuff: this.getStatus().stuff - 1,
      });
      this.setJournal(`Transacting with ${meeple.name}`);
    }

    if (this.hasTag(MeepleKind.Home)) {
      this.setJournal(`Hosting ${meeple.name}`);
    }
  }
}
