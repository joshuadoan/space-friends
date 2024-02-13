import { Actor } from "excalibur";
import * as blockies from "blockies-ts";
import { MAX_ZOOM } from "../consts";
import Game from "./game";

export enum MeepleKind {
  SpaceLaborer = "space laborer",
  SpaceShop = "space shop",
  Home = "home",
  Unknown = "unknown",
}

export enum ShipState {
  Off = "off",
  TravelingToWork = "traveling to work",
  TravelingHome = "traveling home",
  Working = "working",
  AtHome = "home",
}

export type Journal = {
  [timeStamp: number]: string;
};

type Status = {
  health: number;
  stuff: number;
  lights: Lights;
};

export enum Lights {
  On = "on",
  Off = "off",
}

export enum DestinationState {
  Open = "open",
}
export class MeepleClass extends Actor {
  private guests: {
    [id: string]: MeepleClass;
  } = {};

  private journal: Journal = {};

  private imageUrl = "";
  private state: ShipState | DestinationState = ShipState.Off;
  private status: Status = {
    health: 100,
    stuff: 0,
    lights: Lights.Off,
  };

  setStatus(status: Status) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  setJournal(action: string) {
    const timeStamp = Date.now();
    this.journal[timeStamp] = action;
  }

  getJournal() {
    return this.journal;
  }

  getAvatar() {
    return this.imageUrl;
  }

  setAvatar(seed: string) {
    this.imageUrl = blockies.create({ seed }).toDataURL();
  }

  /**
   * Zooms the camera in on the specified actor over a period of time.
   */
  zoomTo() {
    const camera = this.scene.camera;
    camera.clearAllStrategies();
    camera.strategy.elasticToActor(this, 0.3, 0.3);
    camera.strategy.camera.zoomOverTime(MAX_ZOOM, 5000);
  }

  addGuest(guest: MeepleClass) {
    this.guests[guest.id] = guest;
  }
  removeGuest(id: string) {
    delete this.guests[id];
  }

  getGuests() {
    return this.guests;
  }

  setState(state: ShipState | DestinationState) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  getGame(): Game {
    return this.scene.engine as Game;
  }

  turnOffLights() {
    this.setStatus({
      ...this.getStatus(),
      lights: Lights.Off,
    });
  }

  turnOnLights() {
    this.setStatus({
      ...this.getStatus(),
      lights: Lights.On,
    });
  }
}
