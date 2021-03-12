import { Vector2 } from "../../../mathematics/vector";

/**
 * TODO 
 * 完了 Plygonは実装が難しいので保留 -> 再度チャレンジ
 * ぶつかったら方向を変えるようにしたい
 * ぶつかったら色を変えるようにしたい
 * Polygonクラスの改良を行う
 * @description
 * ポリゴンブラシは予めデータを用意しておく必要がある。
 * @author ShingoHosoda
 * @copyright ShingoHosoda
 */
class BrushesPolygon {
  private gl: CanvasRenderingContext2D;
  private coordinate: Vector2[] = [];
  private velocity: Vector2 = new Vector2(0, 0);
  /**
   * 
   * @param gl 
   * @param coordinate 
   * @param polygon_size 
   * @param velocity 
   */
  constructor(gl: CanvasRenderingContext2D, coordinate: Vector2[], velocity: Vector2) {
    this.gl = gl;
    this.coordinate = coordinate;
    this.velocity = velocity;
  }

  paint_step(window_size: Vector2) {
    for (let count = 0; count < this.coordinate.length; count++) {
      this.coordinate[count].add(this.velocity);

      if (this.coordinate[count].x < 0 || this.coordinate[count].x > window_size.x) {
        this.velocity.x *= -1;
      }

      if (this.coordinate[count].y < 0 || this.coordinate[count].y > window_size.y) {
        this.velocity.y *= -1;
      }
    }
  }

  paints_draw(fillColor: string | CanvasGradient) {
    this.gl.fillStyle = fillColor;
    this.gl.beginPath();
    this.gl.moveTo(this.coordinate[0].x, this.coordinate[0].y);
    for (let count = 1; count < this.coordinate.length; count++) {
      this.gl.lineTo(this.coordinate[count].x, this.coordinate[count].y);
    }
    this.gl.closePath();
    this.gl.fill();
  }

  paints_stroke_draw(strokeColor: string | CanvasGradient, stroke_weight: number = 1.0) {
    this.gl.strokeStyle = strokeColor;
    this.gl.lineWidth = stroke_weight;
    this.gl.beginPath();
    this.gl.moveTo(this.coordinate[0].x, this.coordinate[0].y);
    for (let count = 1; count < this.coordinate.length; count++) {
      this.gl.lineTo(this.coordinate[count].x, this.coordinate[count].y);
    }
    this.gl.closePath();
    this.gl.stroke();
  }

  paints_all_draw(fillColor: string | CanvasGradient, strokeColor: string, stroke_weight: number = 1.0) {
    this.gl.fillStyle = fillColor;
    this.gl.strokeStyle = strokeColor;
    this.gl.lineWidth = stroke_weight;
    this.gl.beginPath();
    this.gl.moveTo(this.coordinate[0].x, this.coordinate[0].y);
    for (let count = 1; count < this.coordinate.length; count++) {
      this.gl.lineTo(this.coordinate[count].x, this.coordinate[count].y);
    }

    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
  }
}

export { BrushesPolygon };