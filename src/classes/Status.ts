import { Lights } from "./Lights";
import { MeepleEvent } from "./MeepleEvent";
import { Meeple } from "./Meeple";

export type Status = {
  health: number;
  stuff: number;
  lights: Lights;
  imgUrl: string;
  journal: MeepleEvent[];
  speed: number;
  target: Meeple | null;
};