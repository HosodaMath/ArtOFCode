import * as MathUtl from "../mathematics/math";
/**
 * 
 */
export class Geometry2D {
  /**
   * 
   * @param gl 
   * @param radius 
   * @param segment 
   */
  static circle = (
    gl: CanvasRenderingContext2D,
    radius: number,
    segment: number = 360
  ) => {
    gl.beginPath();
    [...Array(segment).keys()].forEach((theta) => {
      if (segment === 0) {
        gl.moveTo(
          radius * Math.cos(MathUtl.Mathematics.degTorad(theta)),
          radius * Math.sin(MathUtl.Mathematics.degTorad(theta))
        );
      } else {
        gl.lineTo(
          radius * Math.cos(MathUtl.Mathematics.degTorad(theta)),
          radius * Math.sin(MathUtl.Mathematics.degTorad(theta))
        );
      }
    });
    gl.closePath();
  };
}
