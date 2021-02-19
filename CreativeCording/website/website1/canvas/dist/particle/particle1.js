import { Vector2 } from "../vector.js";
class Particle {
    /**
       *
       * @param {Vector2} location1
       * @param {Vector2} velocity1
       */
    constructor(gl, location1, velocity1) {
        this.location1 = new Vector2(0, 0);
        this.velocity1 = new Vector2(0, 0);
        this.addParticle = (windowSize) => {
            this.location1.add(this.velocity1);
            if (this.location1.x < 0 || this.location1.x > windowSize.x) {
                this.velocity1.x *= -1;
            }
            if (this.location1.y < 0 || this.location1.y > windowSize.y) {
                this.velocity1.y *= -1;
            }
        };
        /**
        *
        * @param {string} fill_color
        */
        this.drawParticle = (fill_color) => {
            this.gl.beginPath();
            this.gl.fillStyle = fill_color;
            this.gl.arc(this.location1.x, this.location1.y, 20, 0, Math.PI * 2);
            this.gl.closePath();
            this.gl.fill();
        };
        this.gl = gl;
        this.location1 = location1;
        this.velocity1 = velocity1;
    }
}
export { Particle };
