import * as P5 from "p5";
// 一応classなのでinterfaceを使う
export interface PolygonColorParameter {
  p: P5;
  size: number;
  vertexNumber: number;
  segmentNumber: number;
  fillColor: P5.Color | undefined;
  strokeColor: P5.Color | undefined;
  strokeWidth: number | undefined;
}

export interface PolygonTextureParameter {
  p: P5;
  size: number;
  vertexNumber: number;
  segmentNumber: number;
  texture: P5.Graphics;
}

export class Polygon {
  /**
   *
   * @param polygonType
   * @sample
   * Polygon.polygon({ p: p, size: p.height * 0.25, vertexNumber: 6, segmentNumber: 6, fillColor: p.color("#ffff00"), strokeColor: undefined, strokeWidth: undefined});
   */
  static polygon(polygonType: PolygonColorParameter) {
    if (polygonType.fillColor === undefined) {
      polygonType.fillColor = polygonType.p.color("#ffffff");
    }
    polygonType.p.fill(polygonType.fillColor);

    if (polygonType.strokeColor !== undefined) {
      polygonType.p.stroke(polygonType.strokeColor);
    }

    if (polygonType.strokeWidth !== undefined) {
      polygonType.p.strokeWeight(polygonType.strokeWidth);
    }

    polygonType.p.beginShape();
    [...Array(polygonType.segmentNumber).keys()].forEach((theta) => {
      const radianX = polygonType.p.cos(
        polygonType.p.radians(360 * theta) / polygonType.vertexNumber
      );

      const radianY = polygonType.p.sin(
        polygonType.p.radians(360 * theta) / polygonType.vertexNumber
      );

      const x = radianX * polygonType.size + 0;
      const y = radianY * polygonType.size + 0;
      const z = 0;
      polygonType.p.vertex(x, y, z);
    });
    polygonType.p.endShape(polygonType.p.CLOSE);
    polygonType.p.resetShader();
  }

  static polygonTexture(polygonType: PolygonTextureParameter) {
    polygonType.p.texture(polygonType.texture);
    polygonType.p.beginShape();
    [...Array(polygonType.segmentNumber).keys()].forEach((theta) => {
      const radianX = polygonType.p.cos(
        polygonType.p.radians(360 * theta) / polygonType.vertexNumber
      );

      const radianY = polygonType.p.sin(
        polygonType.p.radians(360 * theta) / polygonType.vertexNumber
      );

      const x = radianX * polygonType.size + 0;
      const y = radianY * polygonType.size + 0;
      const u = 0.5 + radianX / 2.0;
      const v = 0.5 + radianY / 2.0;
      polygonType.p.vertex(x, y, 0, u, v);
      // console.log(radianX, radianY);
    });
    polygonType.p.endShape(polygonType.p.CLOSE);
    polygonType.p.resetShader();
  }
}
