import { Mathematics } from "../mathematics.js";
import { Vector2 } from "../vector.js";
/**
 * particle
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class Particle1 {
    /**
     *
     * @param {CanvasRenderingContext2D} gl
     * @param {Vector2} location1
     * @param {Vector2}  velocity1
     * @param {Vector2}  windowSize
     */
    constructor(gl, location1, velocity1, windowSize) {
        this.location1 = new Vector2(0, 0);
        this.velocity1 = new Vector2(0, 0);
        this.size = 0;
        this.initAngle = 0;
        this.radius = 0;
        this.windowSize = new Vector2(0, 0);
        this.gl = gl;
        this.location1 = location1;
        this.velocity1 = velocity1;
        this.size = Mathematics.random(2, 5);
        this.initAngle = Mathematics.random(0, 2 * Math.PI);
        this.windowSize = windowSize;
        this.radius = Math.sqrt(Mathematics.random(0, Math.pow(windowSize.x / 2, 2)));
    }
    drawParticle(fill_color) {
        this.gl.fillStyle = fill_color;
        this.gl.arc(this.location1.x, this.location1.y, this.size, 0, Math.PI * 2);
        this.gl.fill();
    }
    stepParticle(time) {
        this.location1.add(this.velocity1);
        const W = 0.6;
        const ANGLE = W * time + this.initAngle;
        this.location1.x = this.windowSize.x / 2 + this.radius * Math.sin(ANGLE);
        if (this.location1.x > this.windowSize.x) {
            this.location1.x = 0;
        }
    }
}
export { Particle1 };
