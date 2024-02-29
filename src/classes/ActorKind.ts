import { ActorBase } from "./Base";

export enum ActorKind {
  Laborer = "space-trader",
  SpaceShop = "space-shop",
  Home = "home",
  Pirate = "pirate",
  PirateBase = "pirate-base",
  Star = "star",
}

export type KindMap = {
  [key in ActorKind]: ActorBase[];
};
