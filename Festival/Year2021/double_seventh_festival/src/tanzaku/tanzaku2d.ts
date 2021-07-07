import * as Draw from "../draw/draw";
import { TanzakuColorType } from "./tanzaku_color_type";
export class Tanzaku2D {
  private gl: CanvasRenderingContext2D;
  private position: Draw.Vector2;
  private velocity: Draw.Vector2;
  private size: Draw.Vector2;
  constructor(
    gl: CanvasRenderingContext2D,
    position: Draw.Vector2,
    velocity: Draw.Vector2,
    size: Draw.Vector2
  ) {
    this.gl = gl;
    this.position = position;
    this.velocity = velocity;
    this.size = size;
  }

  updateTanzaku = (canvasSize: Draw.Vector2) => {
    this.position.add(this.velocity);
    /*
    if (this.position.y < 0) {
      this.position.y = canvasSize.y + 200;
    }*/
  };

  drawTanzaku = (color: TanzakuColorType) => {
    this.gl.save();
    this.gl.shadowColor = color.shadowColor;
    this.gl.shadowBlur = color.shadowSize;
    this.gl.translate(this.position.x, this.position.y);
    this.gl.scale(Math.cos(Date.now() * 0.001), Math.sin(Date.now() * 0.001));
    this.gl.rotate(Math.cos(Date.now() * 0.001));
    const initPosition = new Draw.Vector2(0, 0);
    const rect = new Draw.Rectangle(this.gl, initPosition, this.size);
    rect.draw_fill(color.fillColor);
    this.gl.restore();
  };
}
