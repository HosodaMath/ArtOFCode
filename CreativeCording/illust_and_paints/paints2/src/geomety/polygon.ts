import { Vector2 } from "../mathematics/vector";
class Polygon {
  private gl: CanvasRenderingContext2D;
  private data: Vector2[] = [];
  /**
   *
   * @param {CanvasRenderingContext2D} gl
   * @param {Vector2[]} data
   */
  constructor(gl: CanvasRenderingContext2D, data: Vector2[]) {
    this.gl = gl;
    this.data = data;
  }

  /**
   * パスを閉じる
   * @param {string | CanvasGradient} fill - 塗りつぶしの色
   */
  drawPolygon2 = (fill: string | CanvasGradient, fill_alpha: number = 1.0) => {
    this.gl.fillStyle = fill;
    this.gl.globalAlpha = fill_alpha;
    this.gl.beginPath();
    this.gl.moveTo(this.data[0].x, this.data[0].y);
    for (let count = 1; count < this.data.length; count++) {
      this.gl.lineTo(this.data[count].x, this.data[count].y);
    }
    this.gl.closePath();
    this.gl.fill();
  };

  /**
   *
   * @param {string | CanvasGradient} fillColor
   * @param {string | CanvasGradient} strokeColor
   * @param {number} strokeWidth
   * @param {number} alpha
   */
  draw = (
    fillColor: string | CanvasGradient,
    strokeColor: string | CanvasGradient,
    strokeWidth: number = 1.0,
    alpha: number = 1.0
  ) => {
    this.gl.fillStyle = fillColor;
    this.gl.strokeStyle = strokeColor;
    this.gl.lineWidth = strokeWidth;
    this.gl.globalAlpha = alpha;
    this.gl.beginPath();
    this.gl.moveTo(this.data[0].x, this.data[0].y);
    for (let count = 1; count < this.data.length; count++) {
      this.gl.lineTo(this.data[count].x, this.data[count].y);
    }
    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
  };
}

export { Polygon };
