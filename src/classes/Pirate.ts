import { Actor, Color } from "excalibur";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { MEEPLE_COLOR, Meeple } from "./Meeple";
import { ActorKind } from "./ActorKind";
import { getPersonName } from "../utils/get-name";
import { Laborer } from "./Laborer";
import { Home } from "./Home";

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

export class Pirate extends Meeple {
  constructor(options?: { name?: string; kind?: ActorKind }) {
    super({
      width: 4,
      height: 2,
      color: MEEPLE_COLOR[ActorKind.Pirate],
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

  getLaborers() {
    return this.scene.actors
      .filter((a) => a instanceof Meeple)
      .map((a) => a as Laborer);
  }

  getHomes() {
    return this.scene.actors
      .filter((a) => {
        return a instanceof Home;
      })
      .map((a) => a as Home);
  }

  next() {
    switch (this.state) {
      case PirateState.Off:
        this.setStatus({
          target: null,
        });
        this.dispatch(PirateAction.Hunt);
        break;
      case PirateState.Hunting:
        this.dispatch(PirateAction.Chase);
        break;
      case PirateState.Chasing:
        const destinations = this.getActorsMap();

        const [closestHome] = destinations[ActorKind.Home].sort((a, b) => {
          return a.distanceTo(this) - b.distanceTo(this);
        });

        const [closestShop] = destinations[ActorKind.SpaceShop].sort((a, b) => {
          return a.distanceTo(this) - b.distanceTo(this);
        });

        if (this.status.target && this.distanceTo(this.status.target) < 200) {
          this.fire(this.status.target);
        }

        if (
          (closestShop && this.distanceTo(closestShop) < 42) ||
          (closestHome && this.distanceTo(closestHome) < 42)
        ) {
          this.setStatus({
            target: closestShop,
          });
          this.dispatch(PirateAction.Flee);
        }
        break;
      case PirateState.Fleeing:
        if (this.isActionComplete()) {
          this.dispatch(PirateAction.TurnOff);
        }
        break;
    }
  }

  fire(target: Meeple) {
    const bullet = new Actor({
      name: `bullet-${getPersonName()}`,
      width: 1,
      height: 1,
      color: Color.White,
      pos: this.pos,
    });

    this.scene.add(bullet);
    bullet.actions.meet(target, 100).callMethod(() => {
      target.setStatus({
        health: target.status.health - 1,
      });
      bullet.kill();
    });
  }

  dispatch(action: PirateAction) {
    switch (action) {
      case PirateAction.Hunt: {
        this.turnOnLights();
        const target = this.getRandomShip(ActorKind.Laborer);
        this.setStatus({
          target,
        });
        this.state = PirateState.Hunting;
        break;
      }
      case PirateAction.Chase: {
        if (!!this.status.target) {
          this.actions.follow(this.status.target, 27);
        }
        this.state = PirateState.Chasing;
        break;
      }
      case PirateAction.TurnOff: {
        this.setStatus({
          target: null,
        });
        this.turnOffLights();
        this.state = PirateState.Off;
        break;
      }
      case PirateAction.Flee: {
        this.actions.clearActions();
        const destination = this.getRandomDestination(ActorKind.PirateBase);
        this.goToDestination(destination).callMethod(() => {
          this.dispatch(PirateAction.TurnOff);
          destination.turnOnLights();
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
