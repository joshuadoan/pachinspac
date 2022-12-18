import { Color, DisplayMode, Engine } from "excalibur";
import { Meeple } from "./Meeple";

export class Game extends Engine {
  public selected: Meeple | null = null;

  constructor() {
    super({
      displayMode: DisplayMode.FitContainerAndZoom,
      backgroundColor: Color.Black,
      canvasElementId: "pepper",
    });
  }
}
