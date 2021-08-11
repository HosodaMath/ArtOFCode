import { Vector2 } from "../mathematics/vector2";
import * as Color from "./colorParameter";

/**
 * @class VetexGeometry
 * @author Shingo Hosoda
 */
export class VertexGeometry {
  gl: CanvasRenderingContext2D;
  vertexData: Vector2[];
  size: number;
  /**
   *
   * @param gl
   * @param vertex_data
   * @param size
   */
  constructor(
    gl: CanvasRenderingContext2D,
    vertex_data: Vector2[],
    size: number
  ) {
    this.gl = gl;
    this.vertexData = vertex_data;
    this.size = size;
  }

  /**
   * 
   * @param vetexColorParameter 
   */
  draw = (vetexColorParameter: Color.colorParameters) => {
    this.gl.beginPath();
    this.gl.fillStyle = vetexColorParameter.fillColor;
    this.gl.strokeStyle = vetexColorParameter.strokeColor;
    this.gl.lineWidth = vetexColorParameter.strokeWidth;
    [...Array(this.vertexData.length).keys()].forEach((count) => {
      if (count === 0) {
        this.gl.moveTo(
          this.vertexData[count].x * this.size,
          this.vertexData[count].y * this.size
        );
      } else {
        this.gl.lineTo(
          this.vertexData[count].x * this.size,
          this.vertexData[count].y * this.size
        );
      }
    });
    this.gl.closePath();
    this.gl.fill();
    this.gl.stroke();
  };

  /**
   * 
   * @param vetexColorParameter 
   */
  drawFill = (vetexColorParameter: Color.colorFillParameters) => {
    this.gl.beginPath();
    this.gl.fillStyle = vetexColorParameter.fillColor;
    [...Array(this.vertexData.length).keys()].forEach((count) => {
      if (count === 0) {
        this.gl.moveTo(
          this.vertexData[count].x * this.size,
          this.vertexData[count].y * this.size
        );
      } else {
        this.gl.lineTo(
          this.vertexData[count].x * this.size,
          this.vertexData[count].y * this.size
        );
      }
    });
    this.gl.closePath();
    this.gl.fill();
  };

  /**
   * 
   * @param vetexColorParameter 
   */
  drawStroke = (vetexColorParameter: Color.colorStrokeParameters) => {
    this.gl.beginPath();
    this.gl.strokeStyle = vetexColorParameter.strokeColor;
    this.gl.lineWidth = vetexColorParameter.strokeWidth;
    [...Array(this.vertexData.length).keys()].forEach((count) => {
      if (count === 0) {
        this.gl.moveTo(
          this.vertexData[count].x * this.size,
          this.vertexData[count].y * this.size
        );
      } else {
        this.gl.lineTo(
          this.vertexData[count].x * this.size,
          this.vertexData[count].y * this.size
        );
      }
    });
    this.gl.closePath();
    this.gl.stroke();
  };
}
