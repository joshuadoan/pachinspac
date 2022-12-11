import { Actor } from "excalibur";

export type MeepleFlavor = "Meeple" | "Ship" | "Station";
export class Meeple extends Actor {
  public health: number = 100;
  public selected: boolean = false;
  public status: string = "Idle";
}
