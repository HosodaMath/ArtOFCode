import { Vector2 } from "../mathematics/vector";

/**
 *
 */
class Line {
  private gl: CanvasRenderingContext2D;
  private start_point: Vector2 = new Vector2(0, 0);
  private end_point: Vector2 = new Vector2(0, 0);
  /**
   * 
   * @param {Vector2} start_point 
   * @param {Vector2} end_point 
   */
  constructor(gl: CanvasRenderingContext2D, start_point: Vector2, end_point: Vector2) {
    this.gl = gl;
    this.start_point = start_point;
    this.end_point = end_point;
  }

  /**
   * 
   * @param {number} stroke_color 
   * @param {number} stroke_width 
   * @param {number} alpha 
   */
  draw = (stroke_color: string, stroke_width: number = 1.0, alpha: number = 1.0) => {
    this.gl.strokeStyle = stroke_color;
    this.gl.lineWidth = stroke_width;
    this.gl.globalAlpha = alpha;
    this.gl.beginPath();
    this.gl.moveTo(this.start_point.x, this.start_point.y);
    this.gl.lineTo(this.end_point.x, this.end_point.y);
    this.gl.stroke();   
  }
}

export {Line};
