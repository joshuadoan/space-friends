import { Color, Engine, Timer } from "excalibur";
import { getDestinationName } from "../utils/get-name";
import { MeepleClass } from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { randomIntFromInterval } from "../utils/helpers";
import {
  DestinationActionKind,
  DestinationState,
  MeepleAction,
  MeepleKind,
} from "../types";

const machine: {
  [state in DestinationState]: {
    [action in DestinationActionKind]?: DestinationState;
  };
} = {
  [DestinationState.Open]: {
    [DestinationActionKind.Close]: DestinationState.Closed,
  },
  [DestinationState.Closed]: {
    [DestinationActionKind.Open]: DestinationState.Open,
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
  async dispatch(action: MeepleAction) {
    const prevState = this.getState() as DestinationState;
    const actionKind = action.kind as DestinationActionKind;
    const newState = machine[prevState][actionKind];

    if (!newState) {
      throw new Error(
        `Action ${action} is not a valid step from state ${this.getState()}`
      );
    }
    this.setJournal(action.kind);
    this.setState(newState);
    action.effect();
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
          this.dispatch({
            kind: DestinationActionKind.Close,
            effect: () => {
              this.turnOffLights();
            },
          });
        }
        break;
      case DestinationState.Closed:
        this.setStatus({
          ...this.getStatus(),
          stuff: this.getStatus().stuff + 1,
        });
        if (this.getStatus().stuff > 99) {
          this.dispatch({
            kind: DestinationActionKind.Open,
            effect: () => {
              this.turnOnLights();
            },
          });
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
