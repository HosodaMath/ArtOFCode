import { Vector2 } from "../../../mathematics/vector";

/**
 * TODO 
 * ぶつかったら方向を変えるようにしたい
 * ぶつかったら色を変えるようにしたい
 * 完了 Plygonは実装が難しいので保留 -> 再度挑戦する
 * @description
 * lineはstrokeのみ
 * @author ShingoHosoda
 * @copyright ShingoHosoda
 */
class BrushesLine {
  private gl: CanvasRenderingContext2D;
  private coordinate: Vector2 = new Vector2(0, 0);
  private line_size: Vector2 = new Vector2(0, 0);
  private velocity: Vector2 = new Vector2(0, 0);
  constructor(gl: CanvasRenderingContext2D, coordinate: Vector2,line_size: Vector2 ,velocity: Vector2){
    this.gl = gl;
    this.coordinate = coordinate;
    this.line_size = line_size;
    this.velocity = velocity;
  }

  paint_step(window_size: Vector2){
    this.coordinate.add(this.velocity);

    if(this.coordinate.x < 0 || this.coordinate.x > window_size.x){
      this.velocity.x *= -1;
    }

    if(this.coordinate.y < 0 || this.coordinate.y > window_size.y){
      this.velocity.y *= -1;
    }
  }

  /**
   * strokeのみ
   * @param strokeColor 
   * @param stroke_weight 
   */
  paints_draw(strokeColor: string | CanvasGradient, stroke_weight: number = 1.0){
    this.gl.strokeStyle = strokeColor;
    this.gl.lineWidth = stroke_weight;
    this.gl.beginPath();
    this.gl.moveTo(this.coordinate.x, this.coordinate.y);
    this.gl.lineTo(this.line_size.x, this.line_size.y);
    this.gl.closePath();
    this.gl.stroke();
  }
}


export {BrushesLine};