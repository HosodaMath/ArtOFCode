import { Vector2 } from "../mathematics/vector.js";
class Circle {
  private gl: CanvasRenderingContext2D;
  private position: Vector2 = new Vector2(0, 0);
  private radius: number = 0;
  /**
   * 
   * @param {CanvasRenderingContext2D} gl 
   * @param {Vector2} init_position 
   * @param {number} init_circle_radius 
   */
  constructor(gl: CanvasRenderingContext2D, init_position: Vector2, init_circle_radius: number){
    this.gl = gl;
    this.position = init_position;
    this.radius = init_circle_radius;
  }

  /**
   * 
   * @param {string} fill 
   * @param {string} stroke 
   * @param {number} stroke_weight 
   * @param {number} alpha 
   */
  draw = (fill: string, stroke: string, stroke_weight: number = 1.0, alpha: number = 1.0) => {
    
    this.gl.globalAlpha = alpha;
    this.gl.fillStyle = fill;
    this.gl.strokeStyle = stroke;
    this.gl.lineWidth = stroke_weight;
    this.gl.beginPath();
    this.gl.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
    
  }

  /**
   * fillのみ描画
   * @param {string} fill 
   * @param {number} alpha 
   */
  draw_fill = (fill: string, alpha: number = 1.0) => {
    this.gl.globalAlpha = alpha;
    this.gl.fillStyle = fill;
    this.gl.beginPath();
    this.gl.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.gl.closePath();
    this.gl.fill();
    
  }
  /**
   * strokeのみ描画
   * @param stroke 
   * @param stroke_weight 
   * @param alpha 
   */
  draw_stroke = (stroke: string, stroke_weight: number = 1.0, alpha: number = 1.0) => {
    this.gl.globalAlpha = alpha;
    this.gl.strokeStyle = stroke;
    this.gl.lineWidth = stroke_weight;
    this.gl.beginPath();
    this.gl.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    this.gl.closePath();
    this.gl.stroke();
 
  }
}

export {Circle};