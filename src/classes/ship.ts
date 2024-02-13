import { Color, Engine, Timer, vec } from "excalibur";
import { getRandomDestination, randomIntFromInterval } from "../utils/helpers";
import { Destination } from "./destination";
import { MeepleClass } from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { getDestinationName } from "../utils/get-name";
import { MeepleKind, ShipAction, ShipActionKind, ShipState } from "../types";

export const MAX_SPEED = 42;
export const MIN_SPEED = 27;

const colors = [Color.Violet, Color.Viridian, Color.Gray, Color.Orange];

export type Transitions = {
  [state in ShipState]: {
    [action in ShipActionKind]?: ShipState;
  };
};

const machine: Transitions = {
  [ShipState.Off]: {
    [ShipActionKind.GoHome]: ShipState.TravelingHome,
    [ShipActionKind.GoToWork]: ShipState.TravelingToWork,
  },
  [ShipState.TravelingToWork]: {
    [ShipActionKind.Work]: ShipState.Working,
  },
  [ShipState.Working]: {
    [ShipActionKind.GoHome]: ShipState.TravelingHome,
    [ShipActionKind.Work]: ShipState.Working,
  },
  [ShipState.TravelingHome]: {
    [ShipActionKind.Hangout]: ShipState.AtHome,
  },
  [ShipState.AtHome]: {
    [ShipActionKind.GoToWork]: ShipState.TravelingToWork,
    [ShipActionKind.Hangout]: ShipState.AtHome,
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
    this.setAvatar(this.color.toString() + this.id + this.name);
    this.pos = getRandomScreenPosition(engine);

    const timer = new Timer({
      interval: randomIntFromInterval(1000, 5000),
      repeats: true,
    });

    timer.on(() => this.next());
    timer.start();

    engine.add(timer);
  }

  async dispatch(action: ShipAction) {
    const newState = machine[this.getState() as ShipState][action.kind];

    if (!newState) {
      console.warn(
        `Action ${action} is not a valid step from state ${this.getState()}`
      );
      return;
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
      case ShipState.Off:
        this.dispatch({
          kind: ShipActionKind.GoToWork,
          effect: () => {
            this.turnOnLights();
            this.goToDestination(MeepleKind.SpaceShop);
          },
        });
        break;
      case ShipState.TravelingToWork:
        this.dispatch({
          kind: ShipActionKind.Work,
          effect: () => {
            this.turnOffLights();
          },
        });
        break;
      case ShipState.TravelingHome:
        this.dispatch({
          kind: ShipActionKind.Hangout,
          effect: () => {
            this.turnOffLights();
          },
        });

        break;
      case ShipState.Working:
        this.setStatus({
          ...this.getStatus(),
          stuff: this.getStatus().stuff + 1,
        });
        if (this.getStatus().stuff > 5) {
          this.dispatch({
            kind: ShipActionKind.GoHome,
            effect: () => {
              this.turnOnLights();
              this.goToDestination(MeepleKind.Home);
            },
          });
        }
        break;
      case ShipState.AtHome:
        this.setStatus({
          ...this.getStatus(),
          stuff: this.getStatus().stuff - 1,
        });
        if (this.getStatus().stuff < 1) {
          this.dispatch({
            kind: ShipActionKind.GoToWork,
            effect: () => {
              this.turnOnLights();
              this.goToDestination(MeepleKind.SpaceShop);
            },
          });
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
