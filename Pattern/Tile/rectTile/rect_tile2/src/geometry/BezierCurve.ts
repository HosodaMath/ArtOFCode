import { Vector2 } from "../mathematics/Vector2";

export type StartPoint = Vector2;
export type ControllPoint = Vector2;
export type EndPoint = Vector2;

export class BezierCurve {
  private gl: CanvasRenderingContext2D;
  private startPoint: StartPoint;
  private controllPoint1: ControllPoint;
  private controllpoint2: ControllPoint;
  private endPoint: EndPoint;
  /**
   * @constructor
   * @param gl
   * @param startPoint
   * @param controllPoint1
   * @param controllPoint2
   * @param endPoint
   */
  constructor(
    gl: CanvasRenderingContext2D,
    startPoint: StartPoint,
    controllPoint1: ControllPoint,
    controllPoint2: ControllPoint,
    endPoint: EndPoint
  ) {
    this.gl = gl;
    this.startPoint = startPoint;
    this.controllPoint1 = controllPoint1;
    this.controllpoint2 = controllPoint2;
    this.endPoint = endPoint;
  }

  draw(
    fill: string | CanvasGradient | CanvasPattern,
    stroke: string | CanvasGradient | CanvasPattern,
    strokeWidth: number = 1
  ) {
    this.gl.fillStyle = fill;
    this.gl.strokeStyle = stroke;
    this.gl.lineWidth = strokeWidth;
    this.gl.beginPath();
    this.gl.moveTo(this.startPoint.x, this.startPoint.y);
    this.gl.bezierCurveTo(
      this.controllPoint1.x,
      this.controllPoint1.y,
      this.controllpoint2.x,
      this.controllpoint2.y,
      this.endPoint.x,
      this.endPoint.y
    );
    this.gl.closePath();
    this.gl.stroke();
    this.gl.fill();
  }

  drawFill(fill: string | CanvasGradient | CanvasPattern) {
    this.gl.fillStyle = fill;
    this.gl.beginPath();
    this.gl.moveTo(this.startPoint.x, this.startPoint.y);
    this.gl.bezierCurveTo(
      this.controllPoint1.x,
      this.controllPoint1.y,
      this.controllpoint2.x,
      this.controllpoint2.y,
      this.endPoint.x,
      this.endPoint.y
    );
    this.gl.closePath();
    this.gl.fill();
  }

  drawStroke(
    stroke: string | CanvasGradient | CanvasPattern,
    strokeWidth: number = 1
  ) {
    this.gl.strokeStyle = stroke;
    this.gl.lineWidth = strokeWidth;
    this.gl.beginPath();
    this.gl.moveTo(this.startPoint.x, this.startPoint.y);
    this.gl.bezierCurveTo(
      this.controllPoint1.x,
      this.controllPoint1.y,
      this.controllpoint2.x,
      this.controllpoint2.y,
      this.endPoint.x,
      this.endPoint.y
    );
    this.gl.closePath();
    this.gl.stroke();
  }
}
