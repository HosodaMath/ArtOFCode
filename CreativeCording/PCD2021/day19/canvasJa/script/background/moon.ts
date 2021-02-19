import { Vector2 } from "../mathematics/vector.js";
/**
 * 月の世界を描くクラス
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class Moon {
  private gl: CanvasRenderingContext2D;
  private moon_location: Vector2 = new Vector2(0, 0);
  private moon_radius: number = 0;
  /**
   * @param {CanvasRenderingContext2D}
   * @param {Vector2} moon_location - 月の座標 
   * @param {Vector2} moon_radius  - 月の大きさ
   */
  constructor(gl: CanvasRenderingContext2D ,moon_location: Vector2, moon_radius: number){
    this.gl = gl;
    this.moon_location = moon_location;
    this.moon_radius = moon_radius;
  }

  drawMoon = (fill_color: string) => {
    this.gl.beginPath();
    this.gl.fillStyle = fill_color;
    this.gl.shadowBlur = 10;
    this.gl.shadowColor = fill_color;
    this.gl.arc(
      this.moon_location.x, this.moon_location.y,
      this.moon_radius, 0, 2 * Math.PI);
    this.gl.closePath();
    this.gl.fill();
  }
}

export {Moon}