import { Vector } from "excalibur";

/**
 * Returns a random integer between the given minimum and maximum values, inclusive.
 */
export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function distanceBetween(a: Vector, b: Vector) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function randomFromArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}
