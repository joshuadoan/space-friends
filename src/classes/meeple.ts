import { Actor } from "excalibur";
import * as blockies from "blockies-ts";
import { MAX_ZOOM } from "../consts";
import Game from "./game";
import { DestinationState, Journal, Lights, ShipState, Status } from "../types";

export class MeepleClass extends Actor {
  private imageUrl = "";
  private journal: Journal = {};
  private state: ShipState | DestinationState = ShipState.Off;
  private status: Status = {
    health: 100,
    stuff: 0,
    lights: Lights.Off,
  };

  onPostUpdate(): void {
    switch (this.getStatus().lights) {
      case Lights.On:
        this.graphics.opacity = 1;
        break;
      case Lights.Off:
        this.graphics.opacity = 0.5;
        break;
    }
  }

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
