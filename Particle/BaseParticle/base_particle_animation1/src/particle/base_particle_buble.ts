import * as Draw from "../draw/draw";
/**
 * @class BaseParticleBuble
 * @description buble particle animation
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 * @license MIT
 * @todo 配列化しないとだめ
 */
export class BaseParticleBuble {
  private buble_position: Draw.Vector2[];
  private buble_velocity: Draw.Vector2;
  private buble_size: number[];
  private gl: CanvasRenderingContext2D;
  /**
   *
   * @param gl
   */
  constructor(gl: CanvasRenderingContext2D) {
    this.buble_position = [];
    this.buble_velocity = new Draw.Vector2(0, -0.8);
    this.buble_size = [];
    this.gl = gl;
  }

  /**
   *
   * @param window_size
   */
  initBaseParticleBuble = (window_size: Draw.Vector2) => {
    [...Array(200).keys()].forEach((count) => {
      this.buble_position[count] = new Draw.Vector2(
        Draw.Random.random(0, window_size.x),
        Draw.Random.random(0, window_size.y)
      );

      this.buble_size[count] = Draw.Random.random(5, 20);
    });
  };

  drawBaseParticle = (window_size: Draw.Vector2) => {
    [...Array(200).keys()].forEach((count) => {
      this.buble_position[count].add(this.buble_velocity);
      this.buble_position[count].x += Math.sin(Draw.Random.random(-1.0, 1.0));

      if (this.buble_position[count].y < 0) {
        this.buble_position[count].x = Draw.Random.random(0, window_size.x);
        this.buble_position[count].y = window_size.y + 20;
        this.buble_size[count] = Draw.Random.random(5, 20);
      }


      const buble = new Draw.Circle(
        this.gl,
        this.buble_position[count],
        this.buble_size[count]
      );

      let buble_color = this.gl.createRadialGradient(
        this.buble_position[count].x,
        this.buble_position[count].y,
        0,
        this.buble_position[count].x,
        this.buble_position[count].y,
        this.buble_size[count]
      );

      buble_color.addColorStop(0.0, "rgba(250, 250, 250, 0.1)");
      buble_color.addColorStop(0.8, "rgba(250, 250, 250, 0.2)");
      buble_color.addColorStop(1.0, "rgba(250, 250, 250, 0.3)");

      buble.draw_fill(buble_color);
    });
  };
}
