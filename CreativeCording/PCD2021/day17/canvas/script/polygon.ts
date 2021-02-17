import {Vector2} from "./vector.js";
/**
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class Polygon {
  private gl: CanvasRenderingContext2D;
  private data: Vector2[] = [];
  /**
   * 
   * @param {CanvasRenderingContext2D} gl 
   * @param {Point[]} data 
   */
  constructor(gl: CanvasRenderingContext2D, data: Vector2[]){
    this.gl = gl;
    this.data = data;
  }

  /**
   * パスは閉じない
   * @param {string | CanvasGradient} stroke - 縁の色(線の色) 
   * @param {number} stroke_weight -縁の太さ(線の太さ) デフォルトでは1.0
   */
  drawPolygon1 = (stroke: string | CanvasGradient, stroke_weight: number = 1.0) =>{
    this.gl.strokeStyle = stroke;
    this.gl.lineWidth = stroke_weight;
    this.gl.beginPath();
    this.gl.moveTo(this.data[0].coord_x, this.data[0].coord_y);
    for (let count = 1; count < this.data.length; count++) {
      this.gl.lineTo(this.data[count].coord_x, this.data[count].coord_y);
    }
    this.gl.stroke();
  }

  /**
   * パスを閉じる
   * @param {string | CanvasGradient} fill - 塗りつぶしの色 
   */
  drawPolygon2 = (fill: string | CanvasGradient, fill_alpha: number = 1.0) =>{
    this.gl.fillStyle = fill;
    this.gl.globalAlpha = fill_alpha;
    this.gl.beginPath();
    this.gl.moveTo(this.data[0].coord_x, this.data[0].coord_y);
    for (let count = 1; count < this.data.length; count++) {
      this.gl.lineTo(this.data[count].coord_x, this.data[count].coord_y);
    }
    this.gl.closePath();
    this.gl.fill();
  }

}

export {Polygon};