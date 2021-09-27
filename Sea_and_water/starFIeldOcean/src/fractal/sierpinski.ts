import * as P5 from "p5";
import * as Geometry from "../geometry/geometry";

export interface SierpinskiParamter {
  canvas: P5.Graphics;
  triangleSize: number;
  levelNumber: number;
  vertexNumber: number;
  segmentNumber: number;
}

export const sierpinskiColor = (sierpinskiParamter: SierpinskiParamter) => {
  if (sierpinskiParamter.levelNumber > 0) {
    
    const polygon = new Geometry.PolygonCanvas({
      canvas: sierpinskiParamter.canvas,
      size: sierpinskiParamter.triangleSize,
      vertexNumber: sierpinskiParamter.vertexNumber,
      segmentNumber: sierpinskiParamter.segmentNumber,
    });
    polygon.drawColor(sierpinskiParamter.canvas.color("#ffff00"));
    
    sierpinskiParamter.canvas.push();
    sierpinskiParamter.canvas.rotate(sierpinskiParamter.canvas.radians(60));
    [...Array(3).keys()].forEach((_count) => {
      sierpinskiParamter.canvas.push();
      sierpinskiParamter.canvas.translate(
        2 * sierpinskiParamter.triangleSize,
        0
      );
      sierpinskiParamter.canvas.rotate(sierpinskiParamter.canvas.PI);
      
      const reCalcParameter: SierpinskiParamter = {
        canvas: sierpinskiParamter.canvas,
        triangleSize: sierpinskiParamter.triangleSize / 2.0,
        levelNumber: sierpinskiParamter.levelNumber - 1.0,
        vertexNumber: sierpinskiParamter.vertexNumber,
        segmentNumber: sierpinskiParamter.segmentNumber,
      };
      sierpinskiColor(reCalcParameter);
      
      sierpinskiParamter.canvas.pop();
      sierpinskiParamter.canvas.rotate(sierpinskiParamter.canvas.radians(120));
    });
    sierpinskiParamter.canvas.pop();
  }
};
