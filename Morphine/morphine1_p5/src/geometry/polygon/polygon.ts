import * as P5 from "p5";

export interface PolygonType {
  p: P5;
  size: number;
  vertexNumber: number;
  segmentNumber: number;
}

export class Polygon {
  readonly polygonParameter: PolygonType;
  constructor(polygonParameter: PolygonType) {
    this.polygonParameter = polygonParameter;
  }

  drawShader = () => {
    this.polygonParameter.p.beginShape();
    [...Array(this.polygonParameter.segmentNumber).keys()].forEach((theta) => {
      const radianX = this.polygonParameter.p.cos(
        this.polygonParameter.p.radians(360 * theta) /
          this.polygonParameter.vertexNumber
      );
      const radianY = this.polygonParameter.p.sin(
        this.polygonParameter.p.radians(360 * theta) /
          this.polygonParameter.vertexNumber
      );
      const radianZ = 0;

      const x = radianX * this.polygonParameter.size;
      const y = radianY * this.polygonParameter.size;
      const z = radianZ * this.polygonParameter.size;
      //const u = 0.5 + radianX / 2.0;
      //const v = 0.5 + radianY / 2.0;
      this.polygonParameter.p.vertex(x, y, z);
    });
    this.polygonParameter.p.endShape(this.polygonParameter.p.CLOSE);
  };

  drawColor = (fillColor: P5.Color) => {
    this.polygonParameter.p.fill(fillColor);
    this.polygonParameter.p.beginShape();
    [...Array(this.polygonParameter.segmentNumber).keys()].forEach((theta) => {
      const radianX = this.polygonParameter.p.cos(
        this.polygonParameter.p.radians(360 * theta) /
          this.polygonParameter.vertexNumber
      );
      const radianY = this.polygonParameter.p.sin(
        this.polygonParameter.p.radians(360 * theta) /
          this.polygonParameter.vertexNumber
      );
      const radianZ = 0;

      const x = radianX * this.polygonParameter.size;
      const y = radianY * this.polygonParameter.size;
      const z = radianZ * this.polygonParameter.size;
      //const u = 0.5 + radianX / 2.0;
      //const v = 0.5 + radianY / 2.0;
      this.polygonParameter.p.vertex(x, y, z);
    });
    this.polygonParameter.p.endShape(this.polygonParameter.p.CLOSE);
  };
}
