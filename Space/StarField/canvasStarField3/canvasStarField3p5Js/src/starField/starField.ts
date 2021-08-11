import P5 from "p5";
import * as DrawP5 from "../draw_p5/draw_p5";

export interface starFieldParameter {
  starLocation: P5.Vector[];
  starSize: number[];
  starColor: string[];
  starShadowColor: string[];
  starShadowBlur: number[];
}

export class StarField {
  private gl: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  private p: P5;
  private starColorParameter: starFieldParameter;
  private star_max: number;

  constructor(
    gl: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    p: P5,
    star_max: number,
    starColorParameter: starFieldParameter
  ) {
    this.gl = gl;
    this.p = p;
    this.starColorParameter = starColorParameter;
    this.star_max = star_max;
  }

  drawSrarField = () => {
    this.gl.save();
    [...Array(this.star_max).keys()].forEach((count) => {
      const star = new DrawP5.CircleGeometryP5(
        this.p,
        this.starColorParameter.starLocation[count],
        this.starColorParameter.starSize[count]
      );

      star.drawShadowColor(this.gl, {
        fillColor: this.starColorParameter.starColor[count],
        strokeColor: this.starColorParameter.starColor[count],
        strokeWidth: 1.0,
        starShadowColor: this.starColorParameter.starShadowColor[count],
        starShadowBlur: this.starColorParameter.starShadowBlur[count],
      });
    });
    this.gl.restore();
  };
}
