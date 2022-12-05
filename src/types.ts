import { Meeple } from "./classes/Meeple";

export type Filter = "ships" | "stations";
export type Filters = {
  [key in Filter]?: boolean;
};
export type State = {
  isPaused: boolean;
  actors: Meeple[];
  filters: Filters;
};

export type Event = {
  type: "toggle-paused" | "update-actors" | "update-filters";
  payload?: Partial<State>;
};
