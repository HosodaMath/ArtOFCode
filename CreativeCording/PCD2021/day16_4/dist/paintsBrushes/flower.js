import { Vector2 } from "../vector.js";
import { Polygon } from "../polygon.js";
/**
 * paints  brushes
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class Flower {
    /**
     *
     * @param {CanvasRenderingContext2D} gl
     * @param {Vector2} location1
     * @param {Vector2} velocity1
     */
    constructor(gl, location1, velocity1) {
        this.location1 = new Vector2(0, 0);
        this.velocity1 = new Vector2(0, 0);
        this.stepFlower = (width, height) => {
            let width4 = width / 4;
            let height4 = height / 4;
            this.location1.add(this.velocity1);
            if (this.location1.coord_x < width4 || this.location1.coord_x > width - width4) {
                this.velocity1.x *= -1;
            }
            if (this.location1.coord_y < height4 || this.location1.coord_y > height - height4) {
                this.velocity1.y *= -1;
            }
        };
        this.drawFlower = (fill_color, radius = 20, k = 4) => {
            let tmp_data = [];
            for (let count = 0; count < Math.PI * 4; count += 0.01) {
                let x = Math.cos(k * count) * Math.cos(count) * radius;
                let y = Math.cos(k * count) * Math.sin(count) * radius;
                tmp_data.push(new Vector2(x + this.location1.x, y + this.location1.y));
            }
            let poly_data = new Polygon(this.gl, tmp_data);
            poly_data.drawPolygon2(fill_color);
        };
        this.gl = gl;
        this.location1 = location1;
        this.velocity1 = velocity1;
    }
}
export { Flower };
