/**
 * Returns an array of X many things
 */

export function repeat<Type>(times: number, expression: () => Type) {
  [...Array(times)].map(expression);
}
