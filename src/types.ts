import { Meeple } from "./engine/Meeple";

export type Filters = "ships" | "stations";
export type State = {
  isPaused: boolean;
  actors: Meeple[];
  filters: {
    [key in Filters]?: boolean;
  };
};

export type Event = {
  type: "toggle-paused" | "update-actors" | "update-filters";
  payload?: Partial<State>;
};
