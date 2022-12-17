import { Actor } from "excalibur";
import { Station } from "./Station";

export type MeepleFlavor = "Meeple" | "Ship" | "Station";
export class Meeple extends Actor {
  public health: number = 100;
  public selected: boolean = false;
  public status: string = "Idle";
  public visitors: {
    [key: string]: Meeple | null;
  } = {};
  public destination: Station | null = null;
  public visiting: Station | null = null;
}
