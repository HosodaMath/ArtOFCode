import * as P5 from "p5";
export interface StarType {
  p: P5;
  size: number;
  pricleNumber: number;
  segmentNumber: number;
}
export class Star {
  static starColor = (starParameter: StarType, fillColor: P5.Color) => {
    const vertexNumber = starParameter.pricleNumber * 2.0;
    const segmet = starParameter.segmentNumber * 2;
    starParameter.p.fill(fillColor);
    starParameter.p.beginShape();
    [...Array(segmet).keys()].forEach((theta) => {
      const size =
        theta % 2 === 0 ? starParameter.size / 2.0 : starParameter.size;
      const radianX = starParameter.p.cos(
        starParameter.p.radians(360 * theta) / vertexNumber
      );

      const radianY = starParameter.p.sin(
        starParameter.p.radians(360 * theta) / vertexNumber
      );

      const vertexX = radianX * size;
      const vertexY = radianY * size;
      const vertexZ = 0;
      starParameter.p.vertex(vertexX, vertexY, vertexZ);
    });
    starParameter.p.endShape(starParameter.p.CLOSE);
  };

  static starShader = (starParameter: StarType, mainShader: P5.Shader) => {
    const vertexNumber = starParameter.pricleNumber * 2.0;
    const segmet = starParameter.segmentNumber * 2;
    starParameter.p.shader(mainShader);
    starParameter.p.beginShape();
    [...Array(segmet).keys()].forEach((theta) => {
      const size =
        theta % 2 === 0 ? starParameter.size / 2.0 : starParameter.size;
      const radianX = starParameter.p.cos(
        starParameter.p.radians(360 * theta) / vertexNumber
      );

      const radianY = starParameter.p.sin(
        starParameter.p.radians(360 * theta) / vertexNumber
      );

      const vertexX = radianX * size;
      const vertexY = radianY * size;
      const vertexZ = 0;
      const u = 0.5 + radianX / 2.0;
      const v = 0.5 + radianY / 2.0;
      starParameter.p.vertex(vertexX, vertexY, vertexZ, u, v);
    });
    starParameter.p.endShape(starParameter.p.CLOSE);
    starParameter.p.resetShader();
  };
}
