import * as MathUtl from "../mathematics/math";
import * as Color from "./colorParameter";

/**
 * @class StarGeometry
 */
export class StarGeometry {
  gl: CanvasRenderingContext2D;
  prickle_num: number;
  segment: number;
  initSize: number;
  /**
   * @constructor
   * @param gl
   * @param prickle_num
   * @param segment
   * @param size
   */
  constructor(
    gl: CanvasRenderingContext2D,
    size: number,
    prickle_num: number = 5,
    segment: number = 5
  ) {
    this.gl = gl;
    this.prickle_num = prickle_num;
    this.segment = segment;
    this.initSize = size;
  }

  /**
   *
   * @param vetexColorParameter
   */
  draw = (vetexColorParameter: Color.colorParameters) => {
    const vertexNumber = this.prickle_num * 2;
    const segmentNumber = this.segment * 2;
    this.gl.beginPath();
    this.gl.fillStyle = vetexColorParameter.fillColor;
    this.gl.strokeStyle = vetexColorParameter.strokeColor;
    this.gl.lineWidth = vetexColorParameter.strokeWidth;

    [...Array(segmentNumber).keys()].forEach((theta) => {
      const size = theta % 2 === 0 ? this.initSize / 2.0 : this.initSize;
      if (theta === 0) {
        this.gl.moveTo(
          size *
            Math.cos(
              MathUtl.Mathematics.degTorad((360 * theta) / vertexNumber)
            ),
          size *
            Math.sin(MathUtl.Mathematics.degTorad((360 * theta) / vertexNumber))
        );
      } else {
        this.gl.lineTo(
          size *
            Math.cos(
              MathUtl.Mathematics.degTorad((360 * theta) / vertexNumber)
            ),
          size *
            Math.sin(MathUtl.Mathematics.degTorad((360 * theta) / vertexNumber))
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
    const vertexNumber = this.prickle_num * 2;
    const segmentNumber = this.segment * 2;
    this.gl.beginPath();
    this.gl.fillStyle = vetexColorParameter.fillColor;
    [...Array(segmentNumber).keys()].forEach((theta) => {
      const size = theta % 2 === 0 ? this.initSize / 2.0 : this.initSize;
      if (theta === 0) {
        this.gl.moveTo(
          size *
            Math.cos(
              MathUtl.Mathematics.degTorad((360 * theta) / vertexNumber)
            ),
          size *
            Math.sin(MathUtl.Mathematics.degTorad((360 * theta) / vertexNumber))
        );
      } else {
        this.gl.lineTo(
          size *
            Math.cos(
              MathUtl.Mathematics.degTorad((360 * theta) / vertexNumber)
            ),
          size *
            Math.sin(MathUtl.Mathematics.degTorad((360 * theta) / vertexNumber))
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
    const vertexNumber = this.prickle_num * 2;
    const segmentNumber = this.segment * 2;
    this.gl.beginPath();
    this.gl.strokeStyle = vetexColorParameter.strokeColor;
    this.gl.lineWidth = vetexColorParameter.strokeWidth;
    [...Array(segmentNumber).keys()].forEach((theta) => {
      const size = theta % 2 === 0 ? this.initSize / 2.0 : this.initSize;
      if (theta === 0) {
        this.gl.moveTo(
          size *
            Math.cos(
              MathUtl.Mathematics.degTorad((360 * theta) / vertexNumber)
            ),
          size *
            Math.sin(MathUtl.Mathematics.degTorad((360 * theta) / vertexNumber))
        );
      } else {
        this.gl.lineTo(
          size *
            Math.cos(
              MathUtl.Mathematics.degTorad((360 * theta) / vertexNumber)
            ),
          size *
            Math.sin(MathUtl.Mathematics.degTorad((360 * theta) / vertexNumber))
        );
      }
    });
    this.gl.closePath();
    this.gl.stroke();
  };
}
