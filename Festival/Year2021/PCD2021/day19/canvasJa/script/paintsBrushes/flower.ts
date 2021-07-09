import { Vector2 } from "../mathematics/vector.js";
import { Polygon } from "../geometry/polygon.js";
/**
 * paints  brushes
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class Flower {
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

  public stepFlower = (width: number, height: number) => {
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

  public drawFlower = (fill_color: string, radius = 20, k: number = 4) => {
    let tmp_data: Vector2[] = [];
    for (let count = 0; count < Math.PI * 4; count += 0.01) {
      let x = Math.cos(k * count) * Math.cos(count) * radius;
      let y = Math.cos(k * count) * Math.sin(count) * radius;
      tmp_data.push(new Vector2(x + this.location1.x, y + this.location1.y));
    }
    let poly_data = new Polygon(this.gl, tmp_data);
    poly_data.drawPolygon2(fill_color);
  }
}

export { Flower };