import { Meeple } from "./Meeple";

export enum ActorKind {
  Laborer = "laborer",
  SpaceShop = "space-shop",
  Home = "home",
  Pirate = "pirate",
  PirateBase = "pirate-base",
}

export type KindMap = {
  [key in ActorKind]: Meeple[];
};
