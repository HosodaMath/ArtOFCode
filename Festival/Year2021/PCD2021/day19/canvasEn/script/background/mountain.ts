import { Vector2 } from "../mathematics/vector.js";
import { Polygon } from "../geometry/polygon.js";
/**
 * ポリゴン山の世界を描くクラス
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
class Mountain1 {
  private gl: CanvasRenderingContext2D;
  private mountain_data: Vector2[];
  constructor(gl: CanvasRenderingContext2D, mountain_data: Vector2[]){
    this.gl = gl;
    this.mountain_data = mountain_data;
  }

  /**
   * ポリゴン山を描く1
   * @param {string | CanvasGradient} fill_color - 塗りつぶしの色 
   */
  drawMountain1 = (fill_color: string | CanvasGradient) => {
    let poly = new Polygon(this.gl, this.mountain_data);
    poly.drawPolygon4(fill_color);
  }

   /**
   * ポリゴン山を描く2
   * @param {string | CanvasGradient} fill_color - 塗りつぶしの色 
   * @param {string} stroke_color - 線の色
   */
  drawMountain2 = (fill_color: string | CanvasGradient, stroke_color: string) => {
    let poly = new Polygon(this.gl, this.mountain_data);
    poly.drawPolygon3(fill_color, stroke_color);
  }
}

/**
 * ベジェ曲線山の世界を描くクラス
 * @class
 * @author Shingo Hosoda
 * @copyright Shingo Hosoda
 */
/*
  class Mountain2 {
    private gl: CanvasRenderingContext2D;
    private mountain_data: Vector2[];
    constructor(gl: CanvasRenderingContext2D, mountain_data: Vector2[]){
      this.gl = gl;
      this.mountain_data = mountain_data;
    }
  }*/

export {Mountain1};