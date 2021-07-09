//書きかけなので注意!!
import {Vector2} from "../mathematics/vector.js";
/**
 * 
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
 class BezierCurve {
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
   * 
   * @param {string | CanvasGradient} fill 
   */
  /*
  drawBezierCurve = (fill: string | CanvasGradient) => {
    this.gl.fillStyle = fill;
    this.gl.beginPath();
    this.gl.moveTo(this.data[0].coord_x, this.data[0].coord_y);
    this.gl.bezierCurveTo();
    this.gl.fill();
  }*/
 }