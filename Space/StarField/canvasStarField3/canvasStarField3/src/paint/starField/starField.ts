import * as Draw from "../../draw/draw";

export interface starFieldParameter {
  starLocation: Draw.Vector2[];
  starSize: number[];
  starColor: string[] | CanvasGradient[] | CanvasPattern[];
  starShadowColor: string[];
  starShadowBlur: number[];
}

export class StarField {
  private gl: CanvasRenderingContext2D;
  private starColorParameter: starFieldParameter;
  private star_max: number;
  /**
   *
   * @param gl
   * @param canvas_size
   */
  constructor(
    gl: CanvasRenderingContext2D,
    star_max: number,
    starColorParameter: starFieldParameter
  ) {
    this.gl = gl;
    this.starColorParameter = starColorParameter;
    this.star_max = star_max;
  }

  /**
   *
   */
  drawSrarField = () => {
    this.gl.save();
    [...Array(this.star_max).keys()].forEach((count) => {
      const star = new Draw.CircleGeometry(
        this.gl,
        this.starColorParameter.starLocation[count],
        this.starColorParameter.starSize[count]
      );

      this.gl.shadowColor = this.starColorParameter.starShadowColor[count];
      this.gl.shadowBlur = this.starColorParameter.starShadowBlur[count];
      star.drawFill({ fillColor: this.starColorParameter.starColor[count] });
    });
    this.gl.restore();
  };
}
