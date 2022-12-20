import { Meeple } from "./classes/Meeple";

export type Filters = {
  [role: string]: boolean;
};
export type State = {
  isPaused: boolean;
  actors: Meeple[];
  filters: Filters;
  selected: Meeple | null;
  sidebarIsOpen: boolean;
};

export type Event = {
  type:
    | "toggle-paused"
    | "update-actors"
    | "update-filters"
    | "set-selected"
    | "toggle-side-bar";
  payload?: Partial<State>;
};
