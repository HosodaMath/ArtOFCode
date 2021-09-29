import * as P5 from "p5";
export interface PolygonType {
  canvas: P5.Graphics;
  size: number;
  vertexNumber: number;
  segmentNumber: number;
}

export class PolygonCanvas {
  private polygonType: PolygonType;
  /**
   *
   * @param polygonParameter
   */
  constructor(polygonParameter: PolygonType) {
    this.polygonType = polygonParameter;
  }

  draw = () => {
    this.polygonType.canvas.beginShape();
    [...Array(this.polygonType.segmentNumber).keys()].forEach((theta) => {
      const radianX = this.polygonType.canvas.cos(
        this.polygonType.canvas.radians(360 * theta) /
          this.polygonType.vertexNumber
      );

      const radianY = this.polygonType.canvas.sin(
        this.polygonType.canvas.radians(360 * theta) /
          this.polygonType.vertexNumber
      );

      const x = radianX * this.polygonType.size;
      const y = radianY * this.polygonType.size;
      const u = 0.5 + radianX / 2.0;
      const v = 0.5 + radianY / 2.0;
      this.polygonType.canvas.vertex(x, y, 0, u, v);
      // console.log(radianX, radianY);
    });
    this.polygonType.canvas.endShape(this.polygonType.canvas.CLOSE);
  };

  drawColor = (polygonColor: P5.Color) => {
    this.polygonType.canvas.fill(polygonColor);
    this.polygonType.canvas.beginShape();
    [...Array(this.polygonType.segmentNumber).keys()].forEach((theta) => {
      const radianX = this.polygonType.canvas.cos(
        this.polygonType.canvas.radians(360 * theta) /
          this.polygonType.vertexNumber
      );

      const radianY = this.polygonType.canvas.sin(
        this.polygonType.canvas.radians(360 * theta) /
          this.polygonType.vertexNumber
      );

      const x = radianX * this.polygonType.size;
      const y = radianY * this.polygonType.size;
      // const u = 0.5 + radianX / 2.0;
      // const v = 0.5 + radianY / 2.0;
      this.polygonType.canvas.vertex(x, y, 0);
      // console.log(radianX, radianY);
    });
    this.polygonType.canvas.endShape(this.polygonType.canvas.CLOSE);
  };

  drawTexture = (textureImage: P5.Image) => {
    this.polygonType.canvas.textureMode(this.polygonType.canvas.NORMAL);
    this.polygonType.canvas.texture(textureImage);
    this.polygonType.canvas.beginShape();
    [...Array(this.polygonType.segmentNumber).keys()].forEach((theta) => {
      const radianX = this.polygonType.canvas.cos(
        this.polygonType.canvas.radians(360 * theta) /
          this.polygonType.vertexNumber
      );

      const radianY = this.polygonType.canvas.sin(
        this.polygonType.canvas.radians(360 * theta) /
          this.polygonType.vertexNumber
      );

      const x = radianX * this.polygonType.size;
      const y = radianY * this.polygonType.size;
      const u = 0.5 + radianX / 2.0;
      const v = 0.5 + radianY / 2.0;
      this.polygonType.canvas.vertex(x, y, u, v);
      // console.log(radianX, radianY);
    });
    this.polygonType.canvas.endShape(this.polygonType.canvas.CLOSE);
  };
}
