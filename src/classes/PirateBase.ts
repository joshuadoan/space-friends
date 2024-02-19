import { Color } from "excalibur";
import { getDestinationName } from "../utils/get-name";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import Game from "./Game";
import { ActorKind } from "./ActorKind";
import { Meeple } from "./Meeple";
import { Lights } from "./Lights";

export class PirateBase extends Meeple {
  constructor(options?: { name?: string; kind?: ActorKind }) {
    super({
      width: 6,
      height: 6,
      color: Color.Red,
      name: getDestinationName(),
      ...options,
    });

    this.kind = ActorKind.PirateBase;
  }
  onInitialize(_engine: Game): void {
    this.kind = ActorKind.PirateBase;
    this.pos = getRandomScreenPosition(this.scene.engine);
    this.setStatus({
      imgUrl: this.generateAvatar(),
      stuff: 100,
      lights: Lights.On,
      journal: [
        {
          action: "open",
          state: "scary",
          timestamp: Date.now(),
        },
      ],
    });
  }
}
