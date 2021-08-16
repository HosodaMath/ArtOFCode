import P5 from "p5";
import * as Color from "./colorParameter";

export class PolygonGeometryP5 {
  private p: P5;
  private position: P5.Vector;
  private radius: number;
  private vertex: number;
  private segment: number;
  constructor(
    p: P5,
    position: P5.Vector,
    radius: number,
    vertex: number,
    segment: number = 360
  ) {
    this.p = p;
    this.position = position;
    this.radius = radius;
    this.vertex = vertex;
    this.segment = segment;
  }

  /**
   *
   * @param colorParameter
   */
  draw = (colorParameter: Color.colorParameter) => {
    this.p.beginShape();
    this.p.fill(colorParameter.fillColor);
    this.p.stroke(colorParameter.strokeColor);
    this.p.strokeWeight(colorParameter.strokeWidth);
    [...Array(this.segment).keys()].forEach((theta) => {
      this.p.vertex(
        this.position.x +
          this.radius * Math.cos(this.p.radians((360 * theta) / this.vertex)),
        this.position.y +
          this.radius * Math.sin(this.p.radians((360 * theta) / this.vertex))
      );
    });
    this.p.endShape(this.p.CLOSE);
  };

  drawFill = (colorParameter: Color.colorFillParameter) => {
    this.p.beginShape();
    this.p.fill(colorParameter.fillColor);
    [...Array(this.segment).keys()].forEach((theta) => {
      this.p.vertex(
        this.position.x +
          this.radius * Math.cos(this.p.radians((360 * theta) / this.vertex)),
        this.position.y +
          this.radius * Math.sin(this.p.radians((360 * theta) / this.vertex))
      );
    });
    this.p.endShape(this.p.CLOSE);
  };

  drawStroke = (colorParameter: Color.colorStrokeParameter) => {
    this.p.beginShape();
    this.p.stroke(colorParameter.strokeColor);
    this.p.strokeWeight(colorParameter.strokeWidth);
    [...Array(this.segment).keys()].forEach((theta) => {
      this.p.vertex(
        this.position.x +
          this.radius * Math.cos(this.p.radians((360 * theta) / this.vertex)),
        this.position.y +
          this.radius * Math.sin(this.p.radians((360 * theta) / this.vertex))
      );
    });
    this.p.endShape(this.p.CLOSE);
  };

  drawShadowColor = (
    canvas: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    colorParameter: Color.colorShadowParameter
  ) => {
    this.p.beginShape();
    canvas.fillStyle = colorParameter.fillColor;
    canvas.strokeStyle = colorParameter.strokeColor;
    canvas.lineWidth = colorParameter.strokeWidth;
    canvas.shadowColor = colorParameter.starShadowColor;
    canvas.shadowBlur = colorParameter.starShadowBlur;
    [...Array(this.segment).keys()].forEach((theta) => {
      this.p.vertex(
        this.position.x +
          this.radius * Math.cos(this.p.radians((360 * theta) / this.vertex)),
        this.position.y +
          this.radius * Math.sin(this.p.radians((360 * theta) / this.vertex))
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
    this.p.beginShape();
    canvas.fillStyle = colorParameter.fillColor;
    canvas.strokeStyle = colorParameter.strokeColor;
    canvas.lineWidth = colorParameter.strokeWidth;
    canvas.shadowColor = colorParameter.starShadowColor;
    canvas.shadowBlur = colorParameter.starShadowBlur;
    [...Array(this.segment).keys()].forEach((theta) => {
      this.p.vertex(
        this.position.x +
          this.radius * Math.cos(this.p.radians((360 * theta) / this.vertex)),
        this.position.y +
          this.radius * Math.sin(this.p.radians((360 * theta) / this.vertex))
      );
    });
    this.p.endShape(this.p.CLOSE);
    canvas.fill();
    canvas.stroke();
  };
}
