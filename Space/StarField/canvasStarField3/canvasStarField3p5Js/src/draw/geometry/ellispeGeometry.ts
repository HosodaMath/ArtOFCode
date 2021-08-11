import { Vector2 } from "../mathematics/vector2";
import { Mathematics } from "../mathematics/math";
import * as Color from "./colorParameter";

/**
 * @class EllipseGeometry
 * @description ellipseの描画
 * @author Shingo Hosoda
 */
export class EllipseGeometry {
  private gl: CanvasRenderingContext2D;
  private position: Vector2;
  private radius: Vector2;
  private segment: number;
  /**
   * @description 初期化
   * @constructor EllipseGeometry
   * @param gl CanvasRenderingContext2D
   * @param position circleの座標
   * @param radius circleの半径
   * @param segment circleの分割数 デフォルトは360
   */
  constructor(
    gl: CanvasRenderingContext2D,
    position: Vector2,
    radius: Vector2,
    segment: number = 360
  ) {
    this.gl = gl;
    this.position = position;
    this.radius = radius;
    this.segment = segment;
  }

  /**
   *
   * @param colorParameters
   */
  draw = (circleParameters: Color.colorParameters) => {
    this.gl.beginPath();
    this.gl.fillStyle = circleParameters.fillColor;
    this.gl.strokeStyle = circleParameters.strokeColor;
    this.gl.lineWidth = circleParameters.strokeWidth;
    [...Array(this.segment).keys()].forEach((theta) => {
      if (this.segment === 0) {
        this.gl.moveTo(
          this.position.x +
            this.radius.x * Math.cos(Mathematics.degTorad(theta)),
          this.position.y +
            this.radius.y * Math.sin(Mathematics.degTorad(theta))
        );
      } else {
        this.gl.lineTo(
          this.position.x +
            this.radius.x * Math.cos(Mathematics.degTorad(theta)),
          this.position.y +
            this.radius.y * Math.sin(Mathematics.degTorad(theta))
        );
      }
    });
    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
  };

  /**
   *
   * @param colorFillParameters
   */
  drawFill = (circleParameters: Color.colorFillParameters) => {
    this.gl.beginPath();
    this.gl.fillStyle = circleParameters.fillColor;
    [...Array(this.segment).keys()].forEach((theta) => {
      if (this.segment === 0) {
        this.gl.moveTo(
          this.position.x +
            this.radius.x * Math.cos(Mathematics.degTorad(theta)),
          this.position.y +
            this.radius.y * Math.sin(Mathematics.degTorad(theta))
        );
      } else {
        this.gl.lineTo(
          this.position.x +
            this.radius.x * Math.cos(Mathematics.degTorad(theta)),
          this.position.y +
            this.radius.y * Math.sin(Mathematics.degTorad(theta))
        );
      }
    });
    this.gl.closePath();
    this.gl.fill();
  };

  /**
   *
   * @param colorStrokeParameters
   */
  drawStroke = (circleParameters: Color.colorStrokeParameters) => {
    this.gl.beginPath();
    this.gl.strokeStyle = circleParameters.strokeColor;
    this.gl.lineWidth = circleParameters.strokeWidth;
    [...Array(this.segment).keys()].forEach((theta) => {
      if (this.segment === 0) {
        this.gl.moveTo(
          this.position.x +
            this.radius.x * Math.cos(Mathematics.degTorad(theta)),
          this.position.y +
            this.radius.y * Math.sin(Mathematics.degTorad(theta))
        );
      } else {
        this.gl.lineTo(
          this.position.x +
            this.radius.x * Math.cos(Mathematics.degTorad(theta)),
          this.position.y +
            this.radius.y * Math.sin(Mathematics.degTorad(theta))
        );
      }
    });
    this.gl.closePath();
    this.gl.stroke();
  };
}
