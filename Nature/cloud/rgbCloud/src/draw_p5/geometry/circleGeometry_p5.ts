import P5 from "p5";
import * as Color from "./colorParameter_p5";

export class CircleGeometryP5 {
  private p: P5;
  private position: P5.Vector;
  private radius: number;
  private segment: number;
  /**
   * @description 初期化
   * @param p
   * @param position circleの座標
   * @param radius circleの半径
   * @param segment circleの分割数 デフォルトは360
   */
  constructor(
    p: P5,
    position: P5.Vector,
    radius: number,
    segment: number = 360
  ) {
    this.p = p;
    this.position = position;
    this.radius = radius;
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
        this.position.x + this.radius * Math.cos(this.p.radians(theta)),
        this.position.y + this.radius * Math.sin(this.p.radians(theta))
      );
    });
    this.p.endShape(this.p.CLOSE);
  };

  drawFill = (colorParameter: Color.colorFillParameter) => {
    this.p.beginShape();
    this.p.fill(colorParameter.fillColor);
    [...Array(this.segment).keys()].forEach((theta) => {
      this.p.vertex(
        this.position.x + this.radius * Math.cos(this.p.radians(theta)),
        this.position.y + this.radius * Math.sin(this.p.radians(theta))
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
        this.position.x + this.radius * Math.cos(this.p.radians(theta)),
        this.position.y + this.radius * Math.sin(this.p.radians(theta))
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
        this.position.x + this.radius * Math.cos(this.p.radians(theta)),
        this.position.y + this.radius * Math.sin(this.p.radians(theta))
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
        this.position.x + this.radius * Math.cos(this.p.radians(theta)),
        this.position.y + this.radius * Math.sin(this.p.radians(theta))
      );
    });
    this.p.endShape(this.p.CLOSE);
    canvas.fill();
    canvas.stroke();
  };
}
