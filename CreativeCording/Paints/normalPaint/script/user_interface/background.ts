import { Vector2 } from "../mathematics/vector.js";
import { Rectangle } from "../geomety/rectangle.js";
/**
 * UIデザイン用背景設定
 */
class BackgroundUI {
  /**
   *
   * @static
   * @param {CanvasRenderingContext2D} gl 
   * @param {Vector2} window_size 
   * @param {string} back_color - default "rgb(190, 205, 215)"
   */
  static normal_mode = (gl: CanvasRenderingContext2D ,
    window_size: Vector2, back_color: string = "rgb(190, 205, 215)") => {
      
      const ORIGIN = new Vector2(0, 0);
      let set_back = new Rectangle(gl, ORIGIN, window_size);
      set_back.draw_fill(back_color);
  }

  /**
   * @static
   * @param {CanvasRenderingContext2D} gl 
   * @param {Vector2} window_size 
   * @param {string} back_color 
   */
  static dark_mode = (gl: CanvasRenderingContext2D ,
    window_size: Vector2, back_color: string = "rgb(35, 35, 35)") => {

      const ORIGIN = new Vector2(0, 0);
      let set_back = new Rectangle(gl, ORIGIN, window_size);
      set_back.draw_fill(back_color);
  }
}

export {BackgroundUI}