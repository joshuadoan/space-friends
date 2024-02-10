import { Color, Engine } from "excalibur";
import { getDestinationName } from "../utils/get-name";
import { Meeple } from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";

export class Destination extends Meeple {
  public state = "open";

  constructor(options?: { name?: string }) {
    super({
      width: 8,
      height: 8,
      color: Color.ExcaliburBlue,
      name: options?.name ?? `The ${getDestinationName()}`,
    });
  }

  onInitialize(engine: Engine): void {
    this.pos = getRandomScreenPosition(engine);
    this.setAvatar(this.color.toString() + this.id + this.name);
  }

  getState() {
    return this.state;
  }
}
