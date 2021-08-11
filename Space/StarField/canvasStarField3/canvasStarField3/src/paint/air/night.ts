import * as Draw from "../../draw/draw";

export interface AirParameters {
  gl: CanvasRenderingContext2D;
  o: Draw.Vector2;
  canvas_size: Draw.Vector2;
}

export class Night {
  private nightParameters: AirParameters;
  constructor(airParameters: AirParameters) {
    this.nightParameters = airParameters;
  }

  drawNight = () => {
    const night = new Draw.Rectangle(
      this.nightParameters.gl,
      this.nightParameters.o,
      this.nightParameters.canvas_size
    );
    const nightColor = this.nightParameters.gl.createLinearGradient(
      this.nightParameters.canvas_size.x / 2.0,
      this.nightParameters.o.x,
      this.nightParameters.canvas_size.x / 2.0,
      this.nightParameters.canvas_size.y
    );

    nightColor.addColorStop(0.0, "rgba(2, 2, 30, 1.0)");
    nightColor.addColorStop(0.5, "rgba(21, 21, 40, 1.0)");
    nightColor.addColorStop(1.0, "rgba(26, 26, 60, 1.0)");

    night.draw_fill(nightColor);
  };
}
