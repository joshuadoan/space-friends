import { Color } from "excalibur";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { ActorKind, Ship } from "./base";
import { getPersonName } from "../utils/get-name";

export enum PirateState {
  Off = "off",
  Hunting = "hunting",
  Chasing = "chasing",
  Fleeing = "fleeing",
}

export enum PirateAction {
  Hunt = "hunt",
  Chase = "chase",
  Flee = "flee",
  TurnOff = "turn off",
}

export class Pirate extends Ship {
  constructor(options?: { name?: string; kind?: ActorKind }) {
    super({
      width: 4,
      height: 2,
      color: Color.Rose,
      name: getPersonName(),
      kind: ActorKind.Pirate,
      ...options,
    });
    this.kind = ActorKind.Pirate;
  }

  private state: PirateState = PirateState.Off;

  onInitialize(): void {
    this.pos = getRandomScreenPosition(this.scene.engine);
    this.startTimer(() => this.next());
    this.setStatus({
      imgUrl: this.generateAvatar(),
    });
  }

  next() {
    switch (this.state) {
      case PirateState.Off:
        this.dispatch(PirateAction.Hunt);
        break;
      case PirateState.Hunting:
        this.dispatch(PirateAction.Chase);
        break;
      case PirateState.Chasing:
        const target = this.status.target;
        if (target && this.distanceTo(target) < 100) {
          this.dispatch(PirateAction.Flee);
        }
        break;
      case PirateState.Fleeing:
        break;
    }
  }

  dispatch(action: PirateAction) {
    switch (action) {
      case PirateAction.Hunt: {
        this.turnOnLights();
        this.setStatus({
          target: this.getRandomShip(ActorKind.Laborer),
        });
        this.state = PirateState.Hunting;
        break;
      }
      case PirateAction.Chase: {
        if (!!this.status.target) {
          this.actions.follow(this.status.target, 14);
        }
        this.state = PirateState.Chasing;
        break;
      }
      case PirateAction.TurnOff: {
        this.turnOffLights();
        this.state = PirateState.Off;
        break;
      }
      case PirateAction.Flee: {
        this.actions.clearActions();
        this.actions
          .moveTo(getRandomScreenPosition(this.scene.engine), this.status.speed)
          .callMethod(() => {
            this.dispatch(PirateAction.TurnOff);
          });
        this.setStatus({
          target: null,
        });
        this.state = PirateState.Fleeing;
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
          action: `${action} ${this.status.target?.name ?? ""}`,
          state: this.state,
          timestamp: Date.now(),
        },
      ],
    });
  }

  hangout() {}
}
