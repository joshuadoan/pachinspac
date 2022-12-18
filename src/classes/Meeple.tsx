import { Actor } from "excalibur";
import { Station } from "./Station";

export type ShipStatus = "Idle" | "Traveling" | "Visiting";
export type StationStatus = "Closed" | "Open";
export type MeepleStatus = ShipStatus | StationStatus;

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
  } = {
    destination: null,
    health: 100,
    selected: false,
    status: "Idle",
    visitors: {},
  };
}
