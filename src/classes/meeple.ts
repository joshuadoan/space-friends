import { Actor } from "excalibur";
import { MAX_ZOOM } from "../consts";
import { ShipAction } from "./ship";
import Game from "./game";

export class Meeple extends Actor {
  private guests: {
    [id: string]: Meeple;
  } = {};

  private journal: {
    [timeStamp: number]: ShipAction;
  } = {};

  setJournal(action: ShipAction) {
    const timeStamp = Date.now();
    this.journal[timeStamp] = action;
  }

  getJournal() {
    return this.journal;
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

  getState() {
    return "";
  }

  getGame(): Game {
    return this.scene.engine as Game;
  }
}
