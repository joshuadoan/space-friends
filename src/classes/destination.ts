import { Color, Engine } from "excalibur";
import { getDestinationName } from "../utils/get-name";
import { DestinationState, Meeple, MeepleKind } from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";

export class Destination extends Meeple {
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
  }

  transact(meeple: Meeple, action?: string) {
    console.log("transact", meeple.name, action);
    if (this.getStatus().stuff > 0) {
      this.setStatus({
        ...this.getStatus(),
        stuff: this.getStatus().stuff - 1,
      });
    } else {
      this.setStatus({
        ...this.getStatus(),
        stuff: 100,
      });
    }
    if (this.hasTag(MeepleKind.SpaceShop)) {
      this.setJournal(`Transacting with ${meeple.name}`);
    }

    if (this.hasTag(MeepleKind.Home)) {
      this.setJournal(`Hosting ${meeple.name}`);
    }
  }
}
