import { Color, Engine } from "excalibur";
import { getDestinationName } from "../utils/get-name";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { ActorKind } from "./ActorKind";
import { Lights } from "./Lights";
import { Meeple } from "./Meeple";

export class SpaceShop extends Meeple {
  constructor(options?: { name?: string }) {
    super({
      width: 6,
      height: 6,
      color: Color.Azure,
      name: getDestinationName(),
      ...options,
    });

    this.kind = ActorKind.SpaceShop;
  }
  onInitialize(_engine: Engine): void {
    this.color = Color.Orange;
    this.pos = getRandomScreenPosition(this.scene.engine);
    this.setStatus({
      imgUrl: this.generateAvatar(),
      stuff: 100,
      lights: Lights.On,
      journal: [
        {
          action: "Open",
          state: "open",
          timestamp: Date.now(),
        },
      ],
    });
  }
}
