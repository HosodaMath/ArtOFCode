import { Vector2 } from "../mathematics/vector";
class Rectangle {
  private gl: CanvasRenderingContext2D;
  private position: Vector2 = new Vector2(0, 0);
  private rect_size: Vector2 = new Vector2(0, 0);
  /**
   * 
   * @param {CanvasRenderingContext2D} gl 
   * @param {Vector2} init_position 
   * @param {Vector2} init_rect_size 
   */
  constructor(gl: CanvasRenderingContext2D, init_position: Vector2, init_rect_size: Vector2){
    this.gl = gl;
    this.position = init_position;
    this.rect_size = init_rect_size;
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
    this.gl.rect(this.position.x, this.position.y, this.rect_size.x, this.rect_size.y);
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
    this.gl.rect(this.position.x, this.position.y, this.rect_size.x, this.rect_size.y);
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
    this.gl.rect(this.position.x, this.position.y, this.rect_size.x, this.rect_size.y);
    this.gl.closePath();
    this.gl.stroke();
  }
}

export {Rectangle};