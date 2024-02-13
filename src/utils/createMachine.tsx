export type StateDefinition<State extends string, Event extends string> = {
  [key in State]: {
    [key in Event]?: State;
  };
};
