import { Color, DisplayMode, Engine } from "excalibur";

export class Game extends Engine {
  constructor() {
    super({
      displayMode: DisplayMode.FillContainer,
      backgroundColor: Color.Black,
      canvasElementId: "pepper",
    });
  }
}
