import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { MEEPLE_COLOR, Meeple } from "./Meeple";
import { ActorKind } from "./ActorKind";
import { getPersonName } from "../utils/get-name";

export enum LaborerState {
  Off = "off",
  Traveling = "traveling",
  Working = "working",
  Home = "home",
}

export enum LaborerActionName {
  GoToWork = "go to work",
  GoHome = "go home",
  Work = "work",
  Hangout = "hangout",
}

export class Laborer extends Meeple {
  constructor(options?: { name?: string; kind?: ActorKind }) {
    super({
      width: 4,
      height: 2,
      color: MEEPLE_COLOR[ActorKind.Laborer],
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
        this.dispatch(LaborerActionName.GoToWork);
        break;
      case LaborerState.Traveling:
        break;
      case LaborerState.Working:
        this.transact(+1);
        if (this.status.stuff > 4) {
          this.dispatch(LaborerActionName.GoHome);
        }
        break;
      case LaborerState.Home:
        this.transact(-1);
        if (this.status.stuff < 1) {
          this.dispatch(LaborerActionName.GoToWork);
        }
        break;
    }
  }

  dispatch(action: LaborerActionName) {
    switch (action) {
      case LaborerActionName.GoToWork: {
        this.turnOnLights();
        const destination = this.getRandomDestination(ActorKind.SpaceShop);
        this.goToDestination(destination).callMethod(() => {
          this.dispatch(LaborerActionName.Work);
        });
        this.state = LaborerState.Traveling;
        break;
      }
      case LaborerActionName.GoHome: {
        this.turnOnLights();
        const destination = this.getRandomDestination(ActorKind.Home);
        this.goToDestination(destination).callMethod(() => {
          this.dispatch(LaborerActionName.Hangout);
        });
        this.state = LaborerState.Traveling;
        break;
      }
      case LaborerActionName.Work: {
        this.turnOffLights();

        this.state = LaborerState.Working;
        break;
      }
      case LaborerActionName.Hangout: {
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
