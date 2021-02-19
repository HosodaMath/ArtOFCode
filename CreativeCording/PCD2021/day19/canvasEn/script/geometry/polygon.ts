import {Vector2} from "../mathematics/vector.js";
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

  /**
   * パスを閉じる
   * @param {string | CanvasGradient} fill - 塗りつぶしの色 
   * @param {string | CanvasGradient} stroke - 線の色
   * @param {number} stroke_weight - 線の太さ
   * @param {number} fill_alpha - アルファ値
   */
  drawPolygon3 = (fill: string | CanvasGradient, stroke: string | CanvasGradient, stroke_weight: number = 1.0, fill_alpha: number = 1.0) =>{
    this.gl.fillStyle = fill;
    this.gl.strokeStyle = stroke;
    this.gl.lineWidth = stroke_weight;
    this.gl.globalAlpha = fill_alpha;
    this.gl.beginPath();
    this.gl.moveTo(this.data[0].coord_x, this.data[0].coord_y);
    for (let count = 1; count < this.data.length; count++) {
      this.gl.lineTo(this.data[count].coord_x, this.data[count].coord_y);
    }
    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
  }

  /**
   * パスを閉じる
   * @param {string | CanvasGradient} fill - 塗りつぶしの色 
   * @param {string} shadow_color
   * @param {number} fill_alpha - アルファ値
   */
  drawPolygon4 = (fill: string | CanvasGradient, shadow_color: string = "#000000" ,fill_alpha: number = 1.0) =>{
    this.gl.fillStyle = fill;
    this.gl.globalAlpha = fill_alpha;
    this.gl.shadowBlur = 10;
    this.gl.shadowColor = shadow_color;
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