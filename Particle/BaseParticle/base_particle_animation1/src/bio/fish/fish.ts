import * as Draw from "../../draw/draw";
/**
 * @class Fish
 * @description Fish作成クラス
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 * @license MIT
 */
export class Fish {
  private fish_position: Draw.Vector2[];
  private fish_velocity: Draw.Vector2[];
  private fish_size: number[];
  private gl: CanvasRenderingContext2D;
  constructor(gl: CanvasRenderingContext2D) {
    this.fish_position = [];
    this.fish_velocity = [];
    this.fish_size = [];
    this.gl = gl;
  }

  /**
   *
   * @param fish_max
   * @param canvas_size
   */
  initFish = (fish_max: number, canvas_size: Draw.Vector2) => {
    [...Array(fish_max).keys()].forEach((count) => {
      this.fish_position[count] = new Draw.Vector2(
        Draw.Random.random(0, canvas_size.x),
        Draw.Random.random(0, canvas_size.y)
      );
      this.fish_velocity[count] = new Draw.Vector2(
        Draw.Random.random(-1.0, -0.8),
        0.0
      );
      this.fish_size[count] = Draw.Random.random(0.5, 0.8);
    });
  };

  /**
   *
   * @param canvas_size
   */
  stepFish = (canvas_size: Draw.Vector2) => {
    [...Array(this.fish_position.length).keys()].forEach((count) => {
      this.gl.save();
      this.fish_position[count].add(this.fish_velocity[count]);

      if (this.fish_position[count].x < -120) {
        this.fish_position[count].x = canvas_size.x;
        this.fish_position[count].y = Draw.Random.random(0, canvas_size.y);
      }

      this.gl.restore();
    });
  };

  /**
   * @todo transformを使う
   */
  drawFish = () => {
    this.gl.save();
    [...Array(this.fish_position.length).keys()].forEach((count) => {
      this.gl.save();
      this.gl.fillStyle = "rgba(150, 150, 150, 0.5)";
      this.gl.strokeStyle = "rgba(250, 250, 250, 0.5)";
      this.gl.translate(
        this.fish_position[count].x,
        this.fish_position[count].y
      );
      this.gl.scale(this.fish_size[count], this.fish_size[count]);
      this.gl.beginPath();
      this.gl.moveTo(0, 0);
      this.gl.quadraticCurveTo(0 + 50, 0 - 80, 0 + 90, 0 - 10);
      this.gl.quadraticCurveTo(0 + 100, 0 - 10, 0 + 115, 0 - 40);
      this.gl.quadraticCurveTo(0 + 115, 0, 0 + 115, 0 + 40);
      this.gl.quadraticCurveTo(0 + 100, 0 + 10, 0 + 90, 0 + 10);
      this.gl.quadraticCurveTo(0 + 50, 0 + 80, 0, 0);
      this.gl.closePath();
      this.gl.fill();
      this.gl.stroke();
      this.gl.restore();
    });
    this.gl.restore();
  };
}
