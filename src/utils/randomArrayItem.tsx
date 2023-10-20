export function randomArrayItem<L>(list: Array<L>) {
  return list[Math.floor(Math.random() * list.length)];
}
