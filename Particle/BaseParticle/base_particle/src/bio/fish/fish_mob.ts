import * as Draw from "../../draw/draw";
/**
 * @class FishMob
 * @description buble particle 観察用Particle
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 * @license MIT
 */
export class FishMob {
  private fish_position: Draw.Vector2;
  private fish_size: number;
  private gl: CanvasRenderingContext2D;
  constructor(gl: CanvasRenderingContext2D) {
    this.fish_position = new Draw.Vector2(300, 300);
    this.fish_size = 0;
    this.gl = gl;
  }

  /**
   *
   * @param fill
   */
  drawFishMob = (fill: string | CanvasGradient) => {
    this.gl.save();
    this.gl.fillStyle = fill;
    this.gl.beginPath();
    this.gl.moveTo(this.fish_position.x, this.fish_position.y);
    this.gl.quadraticCurveTo(
      this.fish_position.x + 50,
      this.fish_position.y - 80,
      this.fish_position.x + 90,
      this.fish_position.y - 10
    );
    this.gl.quadraticCurveTo(
      this.fish_position.x + 100,
      this.fish_position.y - 10,
      this.fish_position.x + 115,
      this.fish_position.y - 40
    );
    this.gl.quadraticCurveTo(
      this.fish_position.x + 115,
      this.fish_position.y,
      this.fish_position.x + 115,
      this.fish_position.y + 40
    );
    this.gl.quadraticCurveTo(
      this.fish_position.x + 100,
      this.fish_position.y + 10,
      this.fish_position.x + 90,
      this.fish_position.y + 10
    );
    this.gl.quadraticCurveTo(
      this.fish_position.x + 50,
      this.fish_position.y + 80,
      this.fish_position.x,
      this.fish_position.y
    );
    this.gl.closePath();
    this.gl.fill();
    this.gl.restore();
  };

  drawFishMobS = (fill: string | CanvasGradient, window_size: Draw.Vector2) => {
    [...Array(10).keys()].forEach((_count) => {
      this.fish_position = new Draw.Vector2(
        Draw.Random.random(0, window_size.x),
        Draw.Random.random(0, window_size.y)
      );
      this.gl.save();
      this.gl.fillStyle = fill;
      this.fish_size = Draw.Random.random(0.5, 0.8);
      this.gl.scale(this.fish_size, this.fish_size);
      this.gl.beginPath();
      this.gl.moveTo(this.fish_position.x, this.fish_position.y);
      this.gl.quadraticCurveTo(
        this.fish_position.x + 50,
        this.fish_position.y - 80,
        this.fish_position.x + 90,
        this.fish_position.y - 10
      );
      this.gl.quadraticCurveTo(
        this.fish_position.x + 100,
        this.fish_position.y - 10,
        this.fish_position.x + 115,
        this.fish_position.y - 40
      );
      this.gl.quadraticCurveTo(
        this.fish_position.x + 115,
        this.fish_position.y,
        this.fish_position.x + 115,
        this.fish_position.y + 40
      );
      this.gl.quadraticCurveTo(
        this.fish_position.x + 100,
        this.fish_position.y + 10,
        this.fish_position.x + 90,
        this.fish_position.y + 10
      );
      this.gl.quadraticCurveTo(
        this.fish_position.x + 50,
        this.fish_position.y + 80,
        this.fish_position.x,
        this.fish_position.y
      );
      this.gl.closePath();
      this.gl.fill();
      this.gl.restore();
    });
  };
}
