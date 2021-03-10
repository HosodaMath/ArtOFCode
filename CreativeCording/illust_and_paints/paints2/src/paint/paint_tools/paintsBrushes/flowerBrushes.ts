import { Vector2 } from "../../../mathematics/vector";
import { Mathematics } from "../../../mathematics/mathematics";
import { Polygon } from "../../../geomety/polygon";
/**
 * paints  brushes
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class BrushesFlower {
  private gl: CanvasRenderingContext2D;
  private location1 = new Vector2(0, 0);
  private velocity1 = new Vector2(0, 0);
  private angle = new Vector2(0, 0);
  private scale = new Vector2(0, 0);
  /**
   * 
   * @param {CanvasRenderingContext2D} gl 
   * @param {Vector2} location1 
   * @param {Vector2} velocity1 
   * @param {Vector2} angle
   * @param {Vector2} scale
   */
  constructor(gl: CanvasRenderingContext2D, location1: Vector2, velocity1: Vector2, angle: Vector2, scale: Vector2) {
    this.gl = gl;
    this.location1 = location1;
    this.velocity1 = velocity1;
    this.angle = angle;
    this.scale = scale;
  }

  public stepFlower = (cnavas_size: Vector2) => {
    let width = cnavas_size.x;
    let height = cnavas_size.y;
    this.location1.add(this.velocity1);
    this.angle.x += this.angle.y;
    this.scale.x += this.scale.y;
    if (this.location1.coord_x < 0 || this.location1.coord_x > width) {
      this.velocity1.x *= -1;
    }

    if (this.location1.coord_y < 0 || this.location1.coord_y > height) {
      this.velocity1.y *= -1;
    }
  }

  public drawFlower = (fill_color: string, radius = 20, k: number = 4) => {
    let tmp_data: Vector2[] = [];
    this.gl.save();
    for (let count = 0; count < Math.PI * 4; count += 0.01) {
      let x = Math.cos(k * count) * Math.cos(count) * radius;
      let y = Math.cos(k * count) * Math.sin(count) * radius;
      tmp_data.push(new Vector2(x, y));
    }
    let poly_data = new Polygon(this.gl, tmp_data);
    this.gl.translate(this.location1.x, this.location1.y);
    this.gl.rotate(Mathematics.degTorad(this.angle.x));
    this.gl.scale(this.scale.x, this.scale.y);
    poly_data.drawPolygon2(fill_color);
    this.gl.restore();
  }
}

export { BrushesFlower };