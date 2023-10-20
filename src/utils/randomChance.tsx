/**
 * Type guard for converting Meeple into a subclass
 */

export function randomChance(percent: number = 0.1) {
  let random = Math.random();
  return random < percent ? true : false;
}
