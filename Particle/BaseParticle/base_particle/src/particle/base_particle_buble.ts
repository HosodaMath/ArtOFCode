import * as Draw from "../draw/draw";
/**
 * @class BaseParticleBuble
 * @description buble particle 観察用Particle
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 * @license MIT
 */
export class BaseParticleBuble {
  private buble_position: Draw.Vector2;
  private buble_size: number;
  private gl: CanvasRenderingContext2D;
  constructor(gl: CanvasRenderingContext2D) {
    this.buble_position = new Draw.Vector2(0, 0);
    this.buble_size = 0;
    this.gl = gl;
  }

  drawBaseParticleBuble = (window_size: Draw.Vector2) => {
    [...Array(200).keys()].forEach((count) => {
      this.buble_position = new Draw.Vector2(
        Draw.Random.random(0, window_size.x),
        Draw.Random.random(0, window_size.y)
      );

      this.buble_size = Draw.Random.random(5, 20);

      const buble = new Draw.Circle(
        this.gl,
        this.buble_position,
        this.buble_size
      );
      let buble_color = this.gl.createRadialGradient(
        this.buble_position.x,
        this.buble_position.y,
        0,
        this.buble_position.x,
        this.buble_position.y,
        this.buble_size
      );

      buble_color.addColorStop(0.0, "rgba(250, 250, 250, 0.1)");
      buble_color.addColorStop(0.8, "rgba(250, 250, 250, 0.2)");
      buble_color.addColorStop(1.0, "rgba(250, 250, 250, 0.3)");

      buble.draw_fill(buble_color);
    });
  };
}
