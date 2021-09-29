import * as P5 from "p5";
export interface StarCanvasType {
  canvas: P5.Graphics;
  size: number;
  pricleNumber: number;
  segmentNumber: number;
}
export class CanvasStar {
  static drawStar = (starParameter: StarCanvasType) => {
    const vertexNumber = starParameter.pricleNumber * 2.0;
    const segmet = starParameter.segmentNumber * 2;
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
      const u = 0.5 + radianX / 2.0;
      const v = 0.5 + radianY / 2.0;
      starParameter.canvas.vertex(vertexX, vertexY, vertexZ, u, v);
    });
    starParameter.canvas.endShape(starParameter.canvas.CLOSE);
  };
}
