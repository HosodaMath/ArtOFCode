import { Vector2 } from "../mathematics/Vector2";

export class LineN {
  /**
   * @constructor
   * @param gl
   * @param point1
   * @param point2
   */
  private gl: CanvasRenderingContext2D;
  private point: Vector2[];
  constructor(gl: CanvasRenderingContext2D, point: Vector2[]) {
    this.gl = gl;
    this.point = point;
  }

  draw(
    strokeColor: string | CanvasGradient | CanvasPattern,
    strokeWidth: number = 1.0
  ) {
    this.gl.strokeStyle = strokeColor;
    this.gl.lineWidth = strokeWidth;
    this.gl.beginPath();

    [...Array(this.point.length).keys()].forEach((count) => {
      if (count === 0) {
        this.gl.moveTo(this.point[0].x, this.point[0].y);
      } else {
        this.gl.lineTo(this.point[count].x, this.point[count].y);
      }
    });
    this.gl.stroke();
  }
}
