import { getRandomScreenPosition } from "../utils/getRandomScreenPosition";
import { ActorKind } from "./ActorKind";
import { Color } from "excalibur";
import Game from "./Game";
import { ActorBase } from "./Base";
import { randomBetween } from "../utils/helpers";

export class Star extends ActorBase {
  constructor(options?: { name?: string; kind?: ActorKind }) {
    super({
      width: 2,
      height: 2,
      color: Color.White,
      ...options,
    });
  }

  onInitialize(engine: Game): void {
    this.kind = ActorKind.Star;
    this.pos = getRandomScreenPosition(engine);
    this.startTimer(() => this.next());
  }

  next() {
    this.actions
      .callMethod(() => {
        this.color = Color.DarkGray;
      })
      .delay(randomBetween(300, 1000))
      .callMethod(() => {
        this.color = Color.White;
      });
  }
}
