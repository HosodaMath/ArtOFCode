import { Vector2 } from "../mathematics/vector2";
export class Polygon {
  private gl: CanvasRenderingContext2D;
  private polygon_position_data: Array<Vector2>;
  /**
   *
   * @param gl
   * @param init_position_data
   */
  constructor(
    gl: CanvasRenderingContext2D,
    init_position_data: Array<Vector2>
  ) {
    this.gl = gl;
    this.polygon_position_data = init_position_data;
  }

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
    [...Array(this.polygon_position_data.length).keys()].forEach((count) => {
      if (count === 0) {
        this.gl.moveTo(
          this.polygon_position_data[count].x,
          this.polygon_position_data[count].y
        );
      } else {
        this.gl.lineTo(
          this.polygon_position_data[count].x,
          this.polygon_position_data[count].y
        );
      }
    });
    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
  };

  draw_fill = (fill: string | CanvasGradient) => {
    this.gl.fillStyle = fill;
    this.gl.beginPath();
    [...Array(this.polygon_position_data.length).keys()].forEach((count) => {
      if (count === 0) {
        this.gl.moveTo(
          this.polygon_position_data[count].x,
          this.polygon_position_data[count].y
        );
      } else {
        this.gl.lineTo(
          this.polygon_position_data[count].x,
          this.polygon_position_data[count].y
        );
      }
    });
    this.gl.closePath();
    this.gl.fill();
  };

  draw_stroke = (stroke: string | CanvasGradient) => {
    this.gl.strokeStyle = stroke;
    this.gl.beginPath();
    [...Array(this.polygon_position_data.length).keys()].forEach((count) => {
      if (count === 0) {
        this.gl.moveTo(
          this.polygon_position_data[count].x,
          this.polygon_position_data[count].y
        );
      } else {
        this.gl.lineTo(
          this.polygon_position_data[count].x,
          this.polygon_position_data[count].y
        );
      }
    });
    this.gl.closePath();
    this.gl.stroke();
  };
}
