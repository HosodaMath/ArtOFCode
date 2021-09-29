import * as P5 from "p5";
export interface PolygonType1 {
  p: P5;
  x: number;
  y: number;
  size: number;
  pointNumber: number;
}

export interface PolygonType2 {
  p: P5;
  x: number;
  y: number;
  size: number;
  vertexNumber: number;
  segmentNumber: number;
}

/**
 *
 */
export class Polygon {
  /**
   *
   * @param polygonType1
   * @param mainShader
   */
  static polygonShader1 = (
    polygonType1: PolygonType1,
    mainShader: P5.Shader
  ) => {
    const radius = polygonType1.size;
    const angleStep = (2 * polygonType1.p.PI) / polygonType1.pointNumber;
    let angle = 0;
    polygonType1.p.shader(mainShader);
    polygonType1.p.beginShape();
    [...Array(polygonType1.pointNumber + 1).keys()].forEach((_count) => {
      const pointX = polygonType1.x + radius * polygonType1.p.cos(angle);
      const pointY = polygonType1.y + radius * polygonType1.p.sin(angle);
      const u = 0.5 + polygonType1.p.cos(angle) / 2.0;
      const v = 0.5 + polygonType1.p.sin(angle) / 2.0;

      polygonType1.p.vertex(pointX, pointY, 0, u, v);

      angle += angleStep;
      // console.log(polygonType1.p.cos(angle), polygonType1.p.sin(angle));
    });
    polygonType1.p.endShape(polygonType1.p.CLOSE);
    polygonType1.p.resetShader();
  };

  static polygonShader2 = (
    polygonType2: PolygonType2,
    mainShader: P5.Shader
  ) => {
    // polygonType2.p.fill("#ffff00");
    polygonType2.p.shader(mainShader);
    polygonType2.p.beginShape();
    [...Array(polygonType2.segmentNumber).keys()].forEach((theta) => {
      const radianX = polygonType2.p.cos(
        polygonType2.p.radians(360 * theta) / polygonType2.vertexNumber
      );

      const radianY = polygonType2.p.sin(
        polygonType2.p.radians(360 * theta) / polygonType2.vertexNumber
      );

      const x = radianX * polygonType2.size + polygonType2.x;
      const y = radianY * polygonType2.size + polygonType2.y;
      const u = 0.5 + radianX / 2.0;
      const v = 0.5 + radianY / 2.0;
      polygonType2.p.vertex(x, y, 0, u, v);
      // console.log(radianX, radianY);
    });
    polygonType2.p.endShape(polygonType2.p.CLOSE);
    polygonType2.p.resetShader();
  };
}
