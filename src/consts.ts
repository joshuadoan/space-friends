import { Color, DisplayMode } from "excalibur";

export const NUMBER_OF_STARS = 256;
export const NUMBER_OF_STATIONS = 10;
export const NUMBER_OF_SHIPS = 42;

export const MAX_ZOOM = 4;
export const MIN_ZOOM = 1;

export const ENGINE_DEFAULTS = {
  displayMode: DisplayMode.FitScreen,
  backgroundColor: Color.Black,
  canvasElementId: "canvas",
  antialiasing: false,
};
