import { Shape } from "./Shape";
import { Vector2 } from "../mathematics/Vector2";

export class Rectangle extends Shape {
  gl: CanvasRenderingContext2D;
  position: Vector2;
  size: Vector2;
  /**
   *
   * @param gl
   * @param position
   * @param size
   */
  constructor(gl: CanvasRenderingContext2D, position: Vector2, size: Vector2) {
    super(gl, position, size);
    this.gl = gl;
    this.position = position;
    this.size = size;
  }

  /**
   *
   * @param fill
   * @param stroke
   * @param strokeWidth
   */
  draw(
    fill: string | CanvasGradient | CanvasPattern,
    stroke: string | CanvasGradient | CanvasPattern,
    strokeWidth: number = 1.0
  ): void {
    this.gl.fillStyle = fill;
    this.gl.strokeStyle = stroke;
    this.gl.lineWidth = strokeWidth;
    this.gl.beginPath();
    this.gl.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
  }

  /**
   *
   * @param fill
   */
  drawFill(fill: string | CanvasGradient | CanvasPattern): void {
    this.gl.fillStyle = fill;
    this.gl.beginPath();
    this.gl.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    this.gl.closePath();
    this.gl.fill();
  }

  /**
   *
   * @param stroke
   * @param strokeWidth
   */
  drawStroke(
    stroke: string | CanvasGradient | CanvasPattern,
    strokeWidth: number = 1
  ): void {
    this.gl.strokeStyle = stroke;
    this.gl.lineWidth = strokeWidth;
    this.gl.beginPath();
    this.gl.rect(this.position.x, this.position.y, this.size.x, this.size.y);
    this.gl.closePath();
    this.gl.stroke();
  }
}
