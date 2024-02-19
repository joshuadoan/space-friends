import { ActorKind } from "./ActorKind";
import { Meeple } from "./Meeple";

export type KindMap = {
  [key in ActorKind]: Meeple[];
};
