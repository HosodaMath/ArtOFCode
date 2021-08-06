import { Vector2 } from "../mathematics/vector2";
/**
 * @class
 * Circle
 * @description
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
export class Circle {
  private gl: CanvasRenderingContext2D;
  private position: Vector2 = new Vector2(0, 0);
  private radius: number = 0;
  /**
   *
   * @param gl
   * @param init_position
   * @param init_circle_radius
   */
  constructor(
    gl: CanvasRenderingContext2D,
    init_position: Vector2,
    init_circle_radius: number
  ) {
    this.gl = gl;
    this.position = init_position;
    this.radius = init_circle_radius;
  }

  /**
   * @method draw
   * @param fill
   * @param stroke
   * @param stroke_weight
   * @param alpha
   */
  draw = (
    fill: string | CanvasGradient,
    stroke: string | CanvasGradient,
    stroke_weight: number = 1.0,
    alpha: number = 1.0
  ) => {
    this.gl.globalAlpha = alpha;
    this.gl.fillStyle = fill;
    this.gl.strokeStyle = stroke;
    this.gl.lineWidth = stroke_weight;
    this.gl.beginPath();
    this.gl.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
  };

  /**
   * fillのみ描画
   * @method draw_fill
   * @param fill
   * @param alpha
   */
  draw_fill = (fill: string | CanvasGradient, alpha: number = 1.0) => {
    this.gl.globalAlpha = alpha;
    this.gl.fillStyle = fill;
    this.gl.beginPath();
    this.gl.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.gl.closePath();
    this.gl.fill();
  };
  /**
   * strokeのみ描画
   * @method draw_stroke
   * @param stroke
   * @param stroke_weight
   * @param alpha
   */
  draw_stroke = (
    stroke: string | CanvasGradient,
    stroke_weight: number = 1.0,
    alpha: number = 1.0
  ) => {
    this.gl.globalAlpha = alpha;
    this.gl.strokeStyle = stroke;
    this.gl.lineWidth = stroke_weight;
    this.gl.beginPath();
    this.gl.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.gl.closePath();
    this.gl.stroke();
  };
}
