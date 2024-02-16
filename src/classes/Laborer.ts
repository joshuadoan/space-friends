import { Color } from "excalibur";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { ActorKind, Base } from "./base";
import { getPersonName } from "../utils/get-name";

export enum LaborerState {
  Off = "off",
  Traveling = "traveling",
  Working = "working",
  Home = "home",
}

export enum LaborerAction {
  GoToWork = "go to work",
  GoHome = "go home",
  Work = "work",
  Hangout = "hangout",
}

export class Laborer extends Base {
  constructor(options?: { name?: string; kind?: ActorKind }) {
    super({
      width: 4,
      height: 2,
      color: Color.Yellow,
      name: getPersonName(),
      kind: ActorKind.Laborer,
      ...options,
    });
    this.kind = ActorKind.Laborer;
  }

  private state: LaborerState = LaborerState.Off;

  onInitialize(): void {
    this.pos = getRandomScreenPosition(this.scene.engine);
    this.startTimer(() => this.next());
    this.setStatus({
      imgUrl: this.generateAvatar(),
    });
  }

  next() {
    if (!this.isActionComplete()) {
      return;
    }
    switch (this.state) {
      case LaborerState.Off:
        this.dispatch(LaborerAction.GoToWork);
        break;
      case LaborerState.Traveling:
        break;
      case LaborerState.Working:
        this.transact(+1);
        if (this.status.stuff > 5) {
          this.dispatch(LaborerAction.GoHome);
        }
        break;
      case LaborerState.Home:
        this.transact(-1);
        if (this.status.stuff < 0) {
          this.dispatch(LaborerAction.GoToWork);
        }
        break;
    }
  }

  dispatch(action: LaborerAction) {
    switch (action) {
      case LaborerAction.GoToWork: {
        this.turnOnLights();
        const destination = this.getRandomDestination(ActorKind.SpaceShop);
        this.goToDestination(destination).callMethod(() => {
          this.dispatch(LaborerAction.Work);
        });
        this.state = LaborerState.Traveling;
        break;
      }
      case LaborerAction.GoHome: {
        this.turnOnLights();
        const destination = this.getRandomDestination(ActorKind.Home);
        this.goToDestination(destination).callMethod(() => {
          this.dispatch(LaborerAction.Hangout);
        });
        this.state = LaborerState.Traveling;
        break;
      }
      case LaborerAction.Work: {
        this.turnOffLights();

        this.state = LaborerState.Working;
        break;
      }
      case LaborerAction.Hangout: {
        this.turnOffLights();
        this.state = LaborerState.Home;
        break;
      }
      default: {
        return;
      }
    }

    this.setStatus({
      journal: [
        ...this.status.journal,
        {
          action,
          state: this.state,
          timestamp: Date.now(),
        },
      ],
    });
  }

  hangout() {}
}
