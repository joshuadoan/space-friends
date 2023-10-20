import { Color, Engine } from "excalibur";
import { getDestinationName } from "../utils/get-name";
import { Meeple } from "./meeple";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";

export class Destination extends Meeple {
  public state = "open";

  constructor() {
    super({
      name: `The ${getDestinationName()}`,
      width: 8,
      height: 8,
      color: Color.ExcaliburBlue,
    });
  }

  onInitialize(engine: Engine): void {
    this.pos = getRandomScreenPosition(engine);
  }

  setName(name: string) {
    this.owner.name = name;
  }

  getState() {
    return this.state;
  }
}
