import { Color, Engine, Timer, vec } from "excalibur";
import { getRandomDestination, randomIntFromInterval } from "../utils/helpers";
import { Destination } from "./destination";
import { Meeple } from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";

const colors = [Color.Violet, Color.Viridian, Color.Gray, Color.Orange];

export enum ShipState {
  off = "off",
  plotting_course = "plotting course",
  traveling_to_work = "traveling to work",
  working = "working",
}

export enum ShipActions {
  turn_on = "turn_on",
  turn_off = "turn_off",
  go_to_station = "go_to_station",
  trade = "trade",
}

// export type ShipState = keyof typeof ShipStates;

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
  private state: ShipState = ShipState.off;

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
      [ShipState.off]: {
        [ShipActions.turn_on]: ShipState.plotting_course,
      },
      [ShipState.plotting_course]: {
        [ShipActions.go_to_station]: ShipState.traveling_to_work,
        [ShipActions.turn_off]: ShipState.off,
      },
      [ShipState.traveling_to_work]: {
        [ShipActions.turn_off]: ShipState.off,
        [ShipActions.trade]: ShipState.working,
      },
      [ShipState.working]: {
        [ShipActions.turn_off]: ShipState.off,
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
      case ShipState.off:
        this.dispatch({
          name: ShipActions.turn_on,
        });
        break;
      case ShipState.plotting_course:
        this.dispatch({
          name: ShipActions.go_to_station,
          action: () => this.goToWork(),
        });
        break;
      case ShipState.traveling_to_work:
        break;
      case ShipState.working:
        this.dispatch({
          name: ShipActions.turn_off,
        });
        break;
    }
  }

  handleLights() {
    switch (this.state) {
      case ShipState.off:
        this.graphics.opacity = 0.5;
        break;
      case ShipState.plotting_course:
        this.graphics.opacity = 1;
        break;
      case ShipState.traveling_to_work:
        this.graphics.opacity = 1;
        break;
      case ShipState.working:
        this.graphics.opacity = 0.5;
        break;
    }
  }
}
