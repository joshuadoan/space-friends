import { Color, Engine, Timer, vec } from "excalibur";
import { getRandomDestination, randomIntFromInterval } from "../utils/helpers";
import { Destination } from "./destination";
import { Meeple } from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";

const colors = [Color.Violet, Color.Viridian, Color.Gray, Color.Orange];

export enum ShipStates {
  off = "off",
  waiting = "waiting",
  traveling = "traveling",
  trading = "trading",
}

export enum ShipActions {
  turn_on = "turn_on",
  turn_off = "turn_off",
  go_to_station = "go_to_station",
  trade = "trade",
}

export type ShipState = keyof typeof ShipStates;
// export type ShipAction = keyof typeof ShipActions;
export type ShipAction = {
  name: keyof typeof ShipActions;
  action?: () => void;
};

export type StateMachine = {
  [state in ShipStates]: {
    [action in ShipActions]?: ShipState;
  };
};

export class Ship extends Meeple {
  private speed = randomIntFromInterval(10, 20);
  private state: ShipState = ShipStates.off;

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
      [ShipStates.off]: {
        [ShipActions.turn_on]: ShipStates.waiting,
      },
      [ShipStates.waiting]: {
        [ShipActions.go_to_station]: ShipStates.traveling,
        [ShipActions.turn_off]: ShipStates.off,
      },
      [ShipStates.traveling]: {
        [ShipActions.turn_off]: ShipStates.off,
        [ShipActions.trade]: ShipStates.trading,
      },
      [ShipStates.trading]: {
        [ShipActions.turn_off]: ShipStates.off,
      },
    }[this.state][action.name];

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
        // destination.addGuest(this);
        this.dispatch({
          name: ShipActions.trade,
        });
      });
  }

  next() {
    this.handleLights();
    switch (this.state) {
      case ShipStates.off:
        this.dispatch({
          name: ShipActions.turn_on,
        });
        break;
      case ShipStates.waiting:
        this.dispatch({
          name: ShipActions.go_to_station,
          action: () => this.goToWork(),
        });
        break;
      case ShipStates.traveling:
        break;
      case ShipStates.trading:
        this.dispatch({
          name: ShipActions.turn_off,
        });
        break;
    }
  }

  handleLights() {
    switch (this.state) {
      case ShipStates.off:
        this.graphics.opacity = 0.5;
        break;
      case ShipStates.waiting:
        this.graphics.opacity = 1;
        break;
      case ShipStates.traveling:
        this.graphics.opacity = 1;
        break;
      case ShipStates.trading:
        this.graphics.opacity = 0.5;
        break;
    }
  }
}
