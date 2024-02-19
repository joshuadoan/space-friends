import { Color } from "excalibur";
import { getDestinationName } from "../utils/get-name";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import Game from "./Game";
import { ActorKind } from "./ActorKind";
import { Meeple } from "./Meeple";

export class PirateBase extends Meeple {
  constructor(options?: { name?: string; kind?: ActorKind }) {
    super({
      width: 8,
      height: 8,
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
