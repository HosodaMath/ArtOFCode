import { Vector2 } from "../mathematics/vector2";
export class Rectangle {
  private gl: CanvasRenderingContext2D;
  private position: Vector2 = new Vector2(0, 0);
  private rect_size: Vector2 = new Vector2(0, 0);
  /**
   *
   * @param gl
   * @param init_position
   * @param init_rect_size
   */
  constructor(
    gl: CanvasRenderingContext2D,
    init_position: Vector2,
    init_rect_size: Vector2
  ) {
    this.gl = gl;
    this.position = init_position;
    this.rect_size = init_rect_size;
  }

  /**
   *
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
    this.gl.rect(
      this.position.x,
      this.position.y,
      this.rect_size.x,
      this.rect_size.y
    );
    this.gl.fill();
    this.gl.stroke();
  };

  /**
   * fillのみ描画
   * @param fill
   * @param alpha
   */
  draw_fill = (fill: string | CanvasGradient, alpha: number = 1.0) => {
    this.gl.globalAlpha = alpha;
    this.gl.fillStyle = fill;
    this.gl.rect(
      this.position.x,
      this.position.y,
      this.rect_size.x,
      this.rect_size.y
    );
    this.gl.fill();
  };

  /**
   * strokeのみ描画
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
    this.gl.rect(
      this.position.x,
      this.position.y,
      this.rect_size.x,
      this.rect_size.y
    );
    this.gl.stroke();
  };
}
