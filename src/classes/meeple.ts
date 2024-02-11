import { Actor } from "excalibur";
import * as blockies from "blockies-ts";
import { MAX_ZOOM } from "../consts";
import { ShipAction } from "./ship";
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

type Status = {
  health: number;
  stuff: number;
};

export enum DestinationState {
  Open = "open",
}
export class Meeple extends Actor {
  private guests: {
    [id: string]: Meeple;
  } = {};

  private journal: {
    [timeStamp: number]: ShipAction;
  } = {};

  private imageUrl = "";
  private state: ShipState | DestinationState = ShipState.Off;
  private status: Status = {
    health: 100,
    stuff: 0,
  };

  setStatus(status: Status) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  setJournal(action: ShipAction) {
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

  addGuest(guest: Meeple) {
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

  transact() {
    if (this.getStatus().stuff > 0) {
      this.setStatus({
        ...this.getStatus(),
        stuff: this.getStatus().stuff - 1,
      });
    } else {
      this.setStatus({
        ...this.getStatus(),
        stuff: 100,
      });
    }
  }
}
