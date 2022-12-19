import { Actor } from "excalibur";

export type ShipStatus = "Idle" | "Traveling" | "Visiting" | "Stranded";
export type StationStatus = "Closed" | "Open";
export type TaxiStatus = "Idle" | "Picking up";
export type MeepleStatus = ShipStatus | StationStatus | TaxiStatus;

export class Meeple extends Actor {
  public health: number = 100;
  public selected: boolean = false;

  public attributes: {
    status: MeepleStatus;
    destination: Meeple | null;
    health: number;
    selected: boolean;
    visitors: {
      [key: string]: Meeple | null;
    };
    chat: string[];
  } = {
    destination: null,
    health: 100,
    selected: false,
    status: "Idle",
    visitors: {},
    chat: [],
  };
}
