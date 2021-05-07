import { Vector2 } from "../mathematics/vector2";
export class RandomPaints {
  private gl: CanvasRenderingContext2D;
  private paint_position: Vector2[];
  private paint_velocity: Vector2[];
  private paint_size: number;
  constructor(
    gl: CanvasRenderingContext2D,
    paint_position: Vector2[],
    paint_velocity: Vector2[],
    paint_size: number
  ) {
    this.gl = gl;
    this.paint_position = paint_position;
    this.paint_velocity = paint_velocity;
    this.paint_size = paint_size;
  }

  drawStep = (canvas_size: Vector2) => {
    [...Array(this.paint_position.length).keys()].forEach((count) => {
      this.paint_position[count].add(this.paint_velocity[count]);

      if (
        this.paint_position[count].x < 0 ||
        this.paint_position[count].x > canvas_size.x
      ) {
        this.paint_velocity[count].x *= -1;
      }

      if (
        this.paint_position[count].y < 0 ||
        this.paint_position[count].y > canvas_size.y
      ) {
        this.paint_velocity[count].y *= -1;
      }
    });
  };

  drawCirclePaint = (fillColor: string[]) => {
    [...Array(this.paint_position.length).keys()].forEach((count) => {
      this.gl.fillStyle = fillColor[count];
      this.gl.beginPath();
      this.gl.arc(
        this.paint_position[count].x,
        this.paint_position[count].y,
        this.paint_size,
        0,
        Math.PI * 2
      );
      this.gl.closePath();
      this.gl.fill();
    });
  };
}
