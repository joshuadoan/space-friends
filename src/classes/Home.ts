import { Color } from "excalibur";
import { getDestinationName } from "../utils/get-name";
import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import Game from "./Game";
import { ActorKind } from "./ActorKind";
import { Lights } from "./Lights";
import { Meeple } from "./Meeple";

export class Home extends Meeple {
  constructor(options?: { name?: string; kind?: ActorKind }) {
    super({
      width: 8,
      height: 8,
      color: Color.Azure,
      name: getDestinationName(),
      ...options,
    });

    this.kind = ActorKind.Home;
  }
  onInitialize(_engine: Game): void {
    this.kind = ActorKind.Home;
    this.pos = getRandomScreenPosition(this.scene.engine);
    this.setStatus({
      imgUrl: this.generateAvatar(),
      stuff: 100,
      lights: Lights.On,
      journal: [
        {
          action: "open",
          state: "cozy",
          timestamp: Date.now(),
        },
      ],
    });
  }
}
