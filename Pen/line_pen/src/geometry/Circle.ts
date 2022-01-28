import { Vector2 } from "../mathematics/Vector2";
import { Shape } from "./Shape";

export class Circle extends Shape {
  gl: CanvasRenderingContext2D;
  radius: number;
  position: Vector2;
  /**
   * @constructor
   * @param gl
   * @param position
   * @param radius
   */
  constructor(gl: CanvasRenderingContext2D, position: Vector2, radius: number) {
    super(gl, position, radius);
    this.gl = gl;
    this.position = position;
    this.radius = radius;
  }

  draw(
    fill: string | CanvasGradient | CanvasPattern,
    stroke: string | CanvasGradient | CanvasPattern,
    strokeWidth: number = 1.0
  ) {
    this.gl.fillStyle = fill;
    this.gl.strokeStyle = stroke;
    this.gl.lineWidth = strokeWidth;
    this.gl.beginPath();
    this.gl.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
  }

  drawFill(fill: string | CanvasGradient | CanvasPattern) {
    this.gl.fillStyle = fill;
    this.gl.beginPath();
    this.gl.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    this.gl.closePath();
    this.gl.fill();
  }

  drawStroke(
    stroke: string | CanvasGradient | CanvasPattern,
    strokeWidth: number = 1.0
  ) {
    this.gl.strokeStyle = stroke;
    this.gl.lineWidth = strokeWidth;
    this.gl.beginPath();
    this.gl.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    this.gl.closePath();
    this.gl.stroke();
  }
}
