import * as Draw from "../draw/draw";
import { NormalStar2DType } from "./star_color_type";
/**
 * 静的な円状の2D星を作成
 */
export class NormalStar2D {
  private gl: CanvasRenderingContext2D;
  private position: Draw.Vector2;
  private size: number;
  constructor(
    gl: CanvasRenderingContext2D,
    position: Draw.Vector2,
    size: number
  ) {
    this.gl = gl;
    this.position = position;
    this.size = size;
  }

  drawStaticStar = (color: NormalStar2DType) => {
    this.gl.save();
    this.gl.shadowColor = color.shadowColor;
    this.gl.shadowBlur = color.shadowSize;

    const circle = new Draw.Circle(this.gl, this.position, this.size);
    circle.draw_fill(color.fillColor);
    this.gl.restore();
  };
}
