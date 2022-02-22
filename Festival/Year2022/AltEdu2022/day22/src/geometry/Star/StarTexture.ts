import * as P5 from "p5";
export interface StarImageColorParameter {
  canvas: P5.Graphics;
  size: number;
  pricleNumber: number;
  segmentNumber: number;
  fillColor: P5.Color | undefined;
  strokeColor: P5.Color | undefined;
  strokeWidth: number | undefined;
}

export interface StarImageTextureParameter {
  canvas: P5.Graphics;
  size: number;
  pricleNumber: number;
  segmentNumber: number;
  texture: P5.Graphics | P5.Image,
}

export class StarTexture {
  static starColor = (starParameter: StarImageColorParameter) => {
    const vertexNumber = starParameter.pricleNumber * 2.0;
    const segmet = starParameter.segmentNumber * 2;

    if (starParameter.fillColor === undefined) {
      starParameter.fillColor = starParameter.canvas.color("#ffffff");
    }
    starParameter.canvas.fill(starParameter.fillColor);

    if (starParameter.strokeColor !== undefined) {
      starParameter.canvas.stroke(starParameter.strokeColor);
    }

    if (starParameter.strokeWidth !== undefined) {
      starParameter.canvas.strokeWeight(starParameter.strokeWidth);
    }

    starParameter.canvas.beginShape();
    [...Array(segmet).keys()].forEach((theta) => {
      const size =
        theta % 2 === 0 ? starParameter.size / 2.0 : starParameter.size;
      const radianX = starParameter.canvas.cos(
        starParameter.canvas.radians(360 * theta) / vertexNumber
      );

      const radianY = starParameter.canvas.sin(
        starParameter.canvas.radians(360 * theta) / vertexNumber
      );

      const vertexX = radianX * size;
      const vertexY = radianY * size;
      const vertexZ = 0;
      starParameter.canvas.vertex(vertexX, vertexY, vertexZ);
    });
    starParameter.canvas.endShape(starParameter.canvas.CLOSE);
  };

  static starTexture = (
    starParameter: StarImageTextureParameter
  ) => {
    const vertexNumber = starParameter.pricleNumber * 2.0;
    const segmet = starParameter.segmentNumber * 2;
    
    starParameter.canvas.texture(starParameter.texture);

    starParameter.canvas.beginShape();
    [...Array(segmet).keys()].forEach((theta) => {
      const size =
        theta % 2 === 0 ? starParameter.size / 2.0 : starParameter.size;
      const radianX = starParameter.canvas.cos(
        starParameter.canvas.radians(360 * theta) / vertexNumber
      );

      const radianY = starParameter.canvas.sin(
        starParameter.canvas.radians(360 * theta) / vertexNumber
      );

      const vertexX = radianX * size;
      const vertexY = radianY * size;
      const vertexZ = 0;
      const u = 0.5 + radianX * 0.5;
      const v = 0.5 + radianY  * 0.5;
      starParameter.canvas.vertex(vertexX, vertexY, vertexZ, u, v);
    });
    starParameter.canvas.endShape(starParameter.canvas.CLOSE);
    starParameter.canvas.resetShader();
  };
}
