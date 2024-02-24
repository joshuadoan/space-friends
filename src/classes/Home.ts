import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { ActorKind } from "./ActorKind";
import Game from "./Game";
import { Lights } from "./Lights";
import { MEEPLE_COLOR, ActorBase } from "./Base";
import { getSpaceBarName } from "../utils/get-name";

export class Home extends ActorBase {
  constructor(options?: { name?: string; kind?: ActorKind }) {
    super({
      width: 6,
      height: 6,
      color: MEEPLE_COLOR[ActorKind.Home],
      name: getSpaceBarName(),
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
