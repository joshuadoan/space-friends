export type StateDefinition<State extends string, Event extends string> = {
  [key in State]: {
    [key in Event]?: State;
  };
};

// const machine = createMachine<string, string>({
//   [ShipState.Idle]: {
//     [ShipAction.GoToWork]: ShipState.Traveling,
//   },
// });

// definition.dispatch(ShipState.Idle, ShipAction.GoToWork);

export function createMachine<State extends string, Event extends string>(
  definition: StateDefinition<State, Event>
) {
  return {
    dispatch: (state: State, event: Event) => {
      let nextState = definition[state][event];
      return nextState ? nextState : state;
    },
  };
}
