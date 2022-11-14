import { Actor } from "excalibur";
import { Meeple } from "./engine/Meeple";

export type State = {
  isPaused: boolean;
  actors: Meeple[];
};

export type Event = {
  type: "toggle-paused" | "update-actors";
  payload?: Partial<State>;
};
