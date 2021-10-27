import * as MathCalc from "../../math/mathematics";
export interface Star2DType {
  canvas: CanvasRenderingContext2D;
  size: number;
  pricleNumber: number;
  segmentNumber: number;
  color: string;
}

export class Star2D {
  static drawColor = (starParameter: Star2DType) => {
    const vertexNumber = starParameter.pricleNumber * 2.0;
    const segmet = starParameter.segmentNumber * 2;
    starParameter.canvas.beginPath();
    starParameter.canvas.fillStyle = starParameter.color;
    starParameter.canvas.shadowColor = starParameter.color;
    starParameter.canvas.shadowBlur = 10;
    [...Array(segmet).keys()].forEach((theta) => {
      const size =
        theta % 2 === 0 ? starParameter.size / 2.0 : starParameter.size;
      const radianX = Math.cos(
        MathCalc.MathCalc.radians(360 * theta) / vertexNumber
      );

      const radianY = Math.sin(
        MathCalc.MathCalc.radians(360 * theta) / vertexNumber
      );

      const vertexX = radianX * size;
      const vertexY = radianY * size;
      if(theta === 0){
        starParameter.canvas.moveTo(vertexX, vertexY);
      } else {
        starParameter.canvas.lineTo(vertexX, vertexY);
      }
    });
    starParameter.canvas.closePath();
    starParameter.canvas.fill();
  };
}
