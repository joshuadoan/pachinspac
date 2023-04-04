export type StateDefinition<State extends string, Event extends string> = {
  [key in State]: {
    [key in Event]?: State;
  };
};

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
