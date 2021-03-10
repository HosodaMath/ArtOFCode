import { Vector2 } from "../../../mathematics/vector";

/**
 * TODO 
 * ぶつかったら方向を変えるようにしたい
 * ぶつかったら色を変えるようにしたい
 * @author ShingoHosoda
 * @copyright ShingoHosoda
 */
class BrushesRectangle {
  private gl: CanvasRenderingContext2D;
  private coordinate: Vector2 = new Vector2(0, 0);
  private rect_size: Vector2 = new Vector2(0, 0);
  private velocity: Vector2 = new Vector2(0, 0);
  constructor(gl: CanvasRenderingContext2D, coordinate: Vector2,rect_size: Vector2 ,velocity: Vector2){
    this.gl = gl;
    this.coordinate = coordinate;
    this.rect_size = rect_size;
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

  paints_draw(fillColor: string | CanvasGradient){
    this.gl.fillStyle = fillColor;
    this.gl.beginPath();
    this.gl.rect(this.coordinate.x, this.coordinate.y, this.rect_size.x, this.rect_size.y);
    this.gl.closePath();
    this.gl.fill();
  }

  paints_stroke_draw(strokeColor: string | CanvasGradient, stroke_weight: number = 1.0){
    this.gl.strokeStyle = strokeColor;
    this.gl.lineWidth = stroke_weight;
    this.gl.beginPath();
    this.gl.rect(this.coordinate.x, this.coordinate.y, this.rect_size.x, this.rect_size.y);
    this.gl.closePath();
    this.gl.stroke();
  }

  paints_all_draw(fillColor: string | CanvasGradient, strokeColor: string | CanvasGradient, stroke_weight: number = 1.0){
    this.gl.fillStyle = fillColor;
    this.gl.strokeStyle = strokeColor;
    this.gl.lineWidth = stroke_weight;
    this.gl.beginPath();
    this.gl.rect(this.coordinate.x, this.coordinate.y, this.rect_size.x, this.rect_size.y);
    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
  }
}


export {BrushesRectangle};