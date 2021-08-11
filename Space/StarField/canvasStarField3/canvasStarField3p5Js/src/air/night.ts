import P5 from "p5";

export interface AirParameters {
  gl: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  o: P5.Vector;
  canvas_size: P5.Vector;
}
export class Night {
  private nightParameters: AirParameters;
  /**
   * 
   * @param airParameters 
   */
  constructor(airParameters: AirParameters) {
    this.nightParameters = airParameters;
  }

  drawNight = () => {
    const nightColor = this.nightParameters.gl.createLinearGradient(
      this.nightParameters.canvas_size.x / 2.0,
      this.nightParameters.o.x,
      this.nightParameters.canvas_size.x / 2.0,
      this.nightParameters.canvas_size.y
    );

    nightColor.addColorStop(0.0, "rgba(2, 2, 30, 1.0)");
    nightColor.addColorStop(0.5, "rgba(21, 21, 40, 1.0)");
    nightColor.addColorStop(1.0, "rgba(26, 26, 60, 1.0)");

    this.nightParameters.gl.fillStyle = nightColor;

    this.nightParameters.gl.rect(
      this.nightParameters.o.x,
      this.nightParameters.o.y,
      this.nightParameters.canvas_size.x,
      this.nightParameters.canvas_size.y
    );

    this.nightParameters.gl.fill();
  };
}
