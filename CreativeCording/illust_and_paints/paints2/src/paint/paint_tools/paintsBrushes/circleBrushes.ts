import { Vector2 } from "../../../mathematics/vector";

/**
 * TODO 
 * ぶつかったら方向を変えるようにしたい
 * ぶつかったら色を変えるようにしたい
 * @author ShingoHosoda
 * @copyright ShingoHosoda
 */
class BrushesCircle {
  private gl: CanvasRenderingContext2D;
  private coordinate: Vector2 = new Vector2(0, 0);
  private radius: number = 0;
  private velocity: Vector2 = new Vector2(0, 0);
  constructor(gl: CanvasRenderingContext2D, coordinate: Vector2,radius: number ,velocity: Vector2){
    this.gl = gl;
    this.coordinate = coordinate;
    this.radius = radius;
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
    this.gl.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, Math.PI * 2);
    this.gl.closePath();
    this.gl.fill();
  }

  paints_stroke_draw(strokeColor: string | CanvasGradient, stroke_weight: number = 1.0){
    this.gl.strokeStyle = strokeColor;
    this.gl.lineWidth = stroke_weight;
    this.gl.beginPath();
    this.gl.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, Math.PI * 2);
    this.gl.closePath();
    this.gl.stroke();
  }

  paints_all_draw(fillColor: string | CanvasGradient, strokeColor: string | CanvasGradient, stroke_weight: number = 1.0){
    this.gl.fillStyle = fillColor;
    this.gl.strokeStyle = strokeColor;
    this.gl.lineWidth = stroke_weight;
    this.gl.beginPath();
    this.gl.arc(this.coordinate.x, this.coordinate.y, this.radius, 0, Math.PI * 2);
    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
  }
}

export {BrushesCircle};