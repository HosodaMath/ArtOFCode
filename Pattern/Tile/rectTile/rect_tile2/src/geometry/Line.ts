import { Vector2 } from "../mathematics/Vector2";

export class Line {
  /**
   * @constructor
   * @param gl
   * @param point1
   * @param point2
   */
  private gl: CanvasRenderingContext2D;
  private point1: Vector2;
  private point2: Vector2;
  constructor(gl: CanvasRenderingContext2D, point1: Vector2, point2: Vector2) {
    this.gl = gl;
    this.point1 = point1;
    this.point2 = point2;
  }

  draw(
    strokeColor: string | CanvasGradient | CanvasPattern,
    strokeWidth: number = 1.0
  ) {
    this.gl.strokeStyle = strokeColor;
    this.gl.lineWidth = strokeWidth;
    this.gl.beginPath();
    this.gl.moveTo(this.point1.x, this.point1.y);
    this.gl.lineTo(this.point2.x, this.point2.y);
    this.gl.stroke();
  }

  
}
