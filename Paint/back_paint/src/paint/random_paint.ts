import { Vector2 } from "../mathematics/vector2";
export class RandomPaint {
  private gl: CanvasRenderingContext2D;
  private paint_position: Vector2;
  private paint_velocity: Vector2;
  private paint_size: number;
  constructor(
    gl: CanvasRenderingContext2D,
    paint_position: Vector2,
    paint_velocity: Vector2,
    paint_size: number
  ) {
    this.gl = gl;
    this.paint_position = paint_position;
    this.paint_velocity = paint_velocity;
    this.paint_size = paint_size;
  }

  drawStep = (canvas_size: Vector2) => {
    this.paint_position.add(this.paint_velocity);

    if (this.paint_position.x < 0 || this.paint_position.x > canvas_size.x) {
      this.paint_velocity.x *= -1;
    }

    if (this.paint_position.y < 0 || this.paint_position.y > canvas_size.y) {
      this.paint_velocity.y *= -1;
    }
  };

  drawCirclePaint = (fillColor: string) => {
    this.gl.fillStyle = fillColor;
    this.gl.beginPath();
    this.gl.arc(
      this.paint_position.x,
      this.paint_position.y,
      this.paint_size,
      0,
      Math.PI * 2
    );
    this.gl.closePath();
    this.gl.fill();
  };
}
