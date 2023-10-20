import { Actor } from "excalibur";
import { getDestinationName } from "../utils/get-name";
import { MAX_ZOOM } from "../consts";

export class Meeple extends Actor {
  public owner = {
    name: `The ${getDestinationName()}`,
  };

  private guests: {
    [id: string]: Meeple;
  } = {};

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
}
