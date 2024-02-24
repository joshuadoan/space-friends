import { Lights } from "./Lights";
import { MeepleEvent } from "./Journal";
import { ActorBase } from "./Base";

export type Status = {
  health: number;
  stuff: number;
  lights: Lights;
  imgUrl: string;
  journal: MeepleEvent[];
  speed: number;
  target: ActorBase | null;
  home: ActorBase | null;
};
