import { Vector2 } from "../vector.js";
import { Mathematics } from "../mathematics.js";
/**
 * paints  brushes
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class Circle {
  private gl: CanvasRenderingContext2D;
  private location1 = new Vector2(0, 0);
  private velocity1 = new Vector2(0, 0);
  /**
   * 
   * @param {CanvasRenderingContext2D} gl 
   * @param {Vector2} location1 
   * @param {Vector2} velocity1 
   */
  constructor(gl: CanvasRenderingContext2D, location1: Vector2, velocity1: Vector2) {
    this.gl = gl;
    this.location1 = location1;
    this.velocity1 = velocity1;
  }

  public stepCircle = (width: number, height: number) => {
    let width4 = width / 4;
    let height4 = height / 4;
    this.location1.add(this.velocity1);

    if (this.location1.coord_x < width4 || this.location1.coord_x > width - width4) {
      this.velocity1.x *= -1;
    }

    if (this.location1.coord_y < height4 || this.location1.coord_y > height - height4) {
      this.velocity1.y *= -1;
    }
  }

  public renderCircle = (fill_color: string) => {
    this.gl.beginPath();
    this.gl.fillStyle = fill_color;
    this.gl.arc(this.location1.x, this.location1.y, Mathematics.random(20, 50), 0, Math.PI);
    this.gl.closePath();
    this.gl.fill();
  }
}

export {Circle};