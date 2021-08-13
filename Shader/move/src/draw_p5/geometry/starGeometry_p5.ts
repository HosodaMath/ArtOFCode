import P5 from "p5";
import * as Color from "./colorParameter_p5";

export class StarGeometryP5 {
  private p: P5;
  private position: P5.Vector;
  private radius: number;
  private prickle_num: number;
  private segment: number;
  constructor(
    p: P5,
    position: P5.Vector,
    radius: number,
    prickle_num: number,
    segment: number = 360
  ) {
    this.p = p;
    this.position = position;
    this.radius = radius;
    this.prickle_num = prickle_num;
    this.segment = segment;
  }

  /**
   *
   * @param colorParameter
   */
  draw = (colorParameter: Color.colorParameter) => {
    const vertexNumber = this.prickle_num * 2;
    const segmentNumber = this.segment * 2;
    this.p.beginShape();
    this.p.fill(colorParameter.fillColor);
    this.p.stroke(colorParameter.strokeColor);
    this.p.strokeWeight(colorParameter.strokeWidth);
    [...Array(segmentNumber).keys()].forEach((theta) => {
      const size = theta % 2 === 0 ? this.radius / 2.0 : this.radius;
      this.p.vertex(
        this.position.x +
          size * Math.cos(this.p.radians((360 * theta) / vertexNumber)),
        this.position.y +
          size * Math.sin(this.p.radians((360 * theta) / vertexNumber))
      );
    });
    this.p.endShape(this.p.CLOSE);
  };

  drawFill = (colorParameter: Color.colorFillParameter) => {
    const vertexNumber = this.prickle_num * 2;
    const segmentNumber = this.segment * 2;
    this.p.beginShape();
    this.p.fill(colorParameter.fillColor);
    [...Array(segmentNumber).keys()].forEach((theta) => {
      const size = theta % 2 === 0 ? this.radius / 2.0 : this.radius;
      this.p.vertex(
        this.position.x +
          size * Math.cos(this.p.radians((360 * theta) / vertexNumber)),
        this.position.y +
          size * Math.sin(this.p.radians((360 * theta) / vertexNumber))
      );
    });
    this.p.endShape(this.p.CLOSE);
  };

  drawStroke = (colorParameter: Color.colorStrokeParameter) => {
    const vertexNumber = this.prickle_num * 2;
    const segmentNumber = this.segment * 2;
    this.p.beginShape();
    this.p.stroke(colorParameter.strokeColor);
    this.p.strokeWeight(colorParameter.strokeWidth);
    [...Array(segmentNumber).keys()].forEach((theta) => {
      const size = theta % 2 === 0 ? this.radius / 2.0 : this.radius;
      this.p.vertex(
        this.position.x +
          size * Math.cos(this.p.radians((360 * theta) / vertexNumber)),
        this.position.y +
          size * Math.sin(this.p.radians((360 * theta) / vertexNumber))
      );
    });
    this.p.endShape(this.p.CLOSE);
  };

  drawShadowColor = (
    canvas: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    colorParameter: Color.colorShadowParameter
  ) => {
    const vertexNumber = this.prickle_num * 2;
    const segmentNumber = this.segment * 2;
    this.p.beginShape();
    canvas.fillStyle = colorParameter.fillColor;
    canvas.strokeStyle = colorParameter.strokeColor;
    canvas.lineWidth = colorParameter.strokeWidth;
    canvas.shadowColor = colorParameter.starShadowColor;
    canvas.shadowBlur = colorParameter.starShadowBlur;
    [...Array(segmentNumber).keys()].forEach((theta) => {
      const size = theta % 2 === 0 ? this.radius / 2.0 : this.radius;
      this.p.vertex(
        this.position.x +
          size * Math.cos(this.p.radians((360 * theta) / vertexNumber)),
        this.position.y +
          size * Math.sin(this.p.radians((360 * theta) / vertexNumber))
      );
    });
    this.p.endShape(this.p.CLOSE);
    canvas.fill();
    canvas.stroke();
  };

  drawGradientColor = (
    canvas: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    colorParameter: Color.colorGradientParameter
  ) => {
    const vertexNumber = this.prickle_num * 2;
    const segmentNumber = this.segment * 2;
    this.p.beginShape();
    canvas.fillStyle = colorParameter.fillColor;
    canvas.strokeStyle = colorParameter.strokeColor;
    canvas.lineWidth = colorParameter.strokeWidth;
    canvas.shadowColor = colorParameter.starShadowColor;
    canvas.shadowBlur = colorParameter.starShadowBlur;
    [...Array(segmentNumber).keys()].forEach((theta) => {
      const size = theta % 2 === 0 ? this.radius / 2.0 : this.radius;
      this.p.vertex(
        this.position.x +
          size * Math.cos(this.p.radians((360 * theta) / vertexNumber)),
        this.position.y +
          size * Math.sin(this.p.radians((360 * theta) / vertexNumber))
      );
    });
    this.p.endShape(this.p.CLOSE);
    canvas.fill();
    canvas.stroke();
  };
}
