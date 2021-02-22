import { Vector2 } from "../vector.js";
class Particle {
  gl: CanvasRenderingContext2D;
  location1: Vector2 = new Vector2(0, 0);
  velocity1: Vector2 = new Vector2(0, 0);
  /**
     * 
     * @param {Vector2} location1 
     * @param {Vector2} velocity1 
     */
  constructor(gl: CanvasRenderingContext2D, location1: Vector2, velocity1: Vector2) {
    this.gl = gl;
    this.location1 = location1;
    this.velocity1 = velocity1;
  }

  addParticle = (windowSize: Vector2) => {
    this.location1.add(this.velocity1);
    if (this.location1.x < 0 || this.location1.x > windowSize.x) {
      this.velocity1.x *= -1;
    }

    if (this.location1.y < 0 || this.location1.y > windowSize.y) {
      this.velocity1.y *= -1;
    }
  }
  /**
  * 
  * @param {string} fill_color 
  */
  drawParticle = (fill_color: string) => {
    this.gl.beginPath();
    this.gl.fillStyle = fill_color;
    this.gl.arc(this.location1.x, this.location1.y, 20, 0, Math.PI * 2);
    this.gl.closePath();
    this.gl.fill();
  }
}

export { Particle };
