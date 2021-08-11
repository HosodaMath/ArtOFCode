import { Vector2 } from "../mathematics/vector2";
import { Mathematics } from "../mathematics/math";
import * as Color from "./colorParameter";

export class PolygonGeometry {
  private gl: CanvasRenderingContext2D;
  private polygon_location: Vector2;
  private size: number;
  private vertex: number;
  private segment: number;
  /**
   *
   * @param gl
   * @param polygon_location
   * @param size
   * @param vertex
   * @param segment
   */
  constructor(
    gl: CanvasRenderingContext2D,
    polygon_location: Vector2,
    size: number,
    vertex: number,
    segment: number
  ) {
    this.gl = gl;
    this.polygon_location = polygon_location;
    this.size = size;
    this.vertex = vertex;
    this.segment = segment;
  }

  draw = (polygonColorParameter: Color.colorParameters) => {
    this.gl.beginPath();
    this.gl.fillStyle = polygonColorParameter.fillColor;
    this.gl.strokeStyle = polygonColorParameter.strokeColor;
    this.gl.lineWidth = polygonColorParameter.strokeWidth;
    [...Array(this.segment).keys()].forEach((theta) => {
      const x =
        Math.cos(Mathematics.degTorad((360 * theta) / this.vertex)) *
          this.size +
        this.polygon_location.x;
      const y =
        Math.sin(Mathematics.degTorad((360 * theta) / this.vertex)) *
          this.size +
        this.polygon_location.y;
      if (theta === 0) {
        this.gl.moveTo(x, y);
      } else {
        this.gl.lineTo(x, y);
      }
    });
    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
  };

  drawFill = (polygonColorParameter: Color.colorFillParameters) => {
    this.gl.beginPath();
    this.gl.fillStyle = polygonColorParameter.fillColor;
    [...Array(this.segment).keys()].forEach((theta) => {
      const x =
        Math.cos(Mathematics.degTorad((360 * theta) / this.vertex)) *
          this.size +
        this.polygon_location.x;
      const y =
        Math.sin(Mathematics.degTorad((360 * theta) / this.vertex)) *
          this.size +
        this.polygon_location.y;
      if (theta === 0) {
        this.gl.moveTo(x, y);
      } else {
        this.gl.lineTo(x, y);
      }
    });
    this.gl.closePath();
    this.gl.fill();
  };

  drawStroke = (polygonColorParameter: Color.colorStrokeParameters) => {
    this.gl.beginPath();
    this.gl.strokeStyle = polygonColorParameter.strokeColor;
    this.gl.lineWidth = polygonColorParameter.strokeWidth;
    [...Array(this.segment).keys()].forEach((theta) => {
      const x =
        Math.cos(Mathematics.degTorad((360 * theta) / this.vertex)) *
          this.size +
        this.polygon_location.x;
      const y =
        Math.sin(Mathematics.degTorad((360 * theta) / this.vertex)) *
          this.size +
        this.polygon_location.y;
      if (theta === 0) {
        this.gl.moveTo(x, y);
      } else {
        this.gl.lineTo(x, y);
      }
    });
    this.gl.closePath();
    this.gl.stroke();
  };
}
