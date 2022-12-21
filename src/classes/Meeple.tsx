import { Actor } from "excalibur";

export type Role = "Unknown" | "Trader" | "Station" | "Maintenance";
export type ShipStatus = "Idle" | "Traveling" | "Visiting" | "Stranded";
export type StationStatus = "Closed" | "Open";
export type MaintenanceStatus = "Idle" | "Repairing";
export type MeepleStatus = ShipStatus | StationStatus | MaintenanceStatus;

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
    role: string;
    log: {
      date: string;
      message: string;
    }[];
  } = {
    destination: null,
    health: 100,
    selected: false,
    status: "Idle",
    visitors: {},
    chat: [],
    role: "Unknown",
    log: [],
  };
}
