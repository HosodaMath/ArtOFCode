import { Vector2 } from "../mathematics/vector.js";
/**
 * paints  brushes
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class Rectangle {
    constructor(gl, location1, velocity1) {
        this.location1 = new Vector2(0, 0);
        this.velocity1 = new Vector2(0, 0);
        this.stepRect = (width, height) => {
            let width4 = width / 4;
            let height4 = height / 4;
            this.location1.add(this.velocity1);
            if (this.location1.coord_x < width4 || this.location1.coord_x > width - width4 - 50) {
                this.velocity1.x *= -1;
            }
            if (this.location1.coord_y < height4 || this.location1.coord_y > height - height4 - 50) {
                this.velocity1.y *= -1;
            }
        };
        this.renderRect = (fill_color) => {
            this.gl.beginPath();
            this.gl.fillStyle = fill_color;
            this.gl.rect(this.location1.coord_x, this.location1.coord_y, 50, 50);
            this.gl.closePath();
            this.gl.fill();
        };
        this.gl = gl;
        this.location1 = location1;
        this.velocity1 = velocity1;
    }
}
export { Rectangle };
