import * as P5 from "p5";
export interface StarColorParameter {
  p: P5;
  size: number;
  pricleNumber: number;
  segmentNumber: number;
  fillColor: P5.Color | undefined;
  strokeColor: P5.Color | undefined;
  strokeWidth: number | undefined;
}

export interface StarTextureParameter {
  p: P5;
  size: number;
  pricleNumber: number;
  segmentNumber: number;
  texture: P5.Graphics,
}

export class Star {
  static starColor = (starParameter: StarColorParameter) => {
    const vertexNumber = starParameter.pricleNumber * 2.0;
    const segmet = starParameter.segmentNumber * 2;

    if (starParameter.fillColor === undefined) {
      starParameter.fillColor = starParameter.p.color("#ffffff");
    }
    starParameter.p.fill(starParameter.fillColor);

    if (starParameter.strokeColor !== undefined) {
      starParameter.p.stroke(starParameter.strokeColor);
    }

    if (starParameter.strokeWidth !== undefined) {
      starParameter.p.strokeWeight(starParameter.strokeWidth);
    }

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

  static starTexture = (
    starParameter: StarTextureParameter
  ) => {
    const vertexNumber = starParameter.pricleNumber * 2.0;
    const segmet = starParameter.segmentNumber * 2;
    
    starParameter.p.texture(starParameter.texture);

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
      const u = 0.5 + radianX * 0.5;
      const v = 0.5 + radianY  * 0.5;
      starParameter.p.vertex(vertexX, vertexY, vertexZ, u, v);
    });
    starParameter.p.endShape(starParameter.p.CLOSE);
    starParameter.p.resetShader();
  };
}
