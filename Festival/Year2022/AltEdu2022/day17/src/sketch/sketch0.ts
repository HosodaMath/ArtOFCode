import P5 from "p5";
import { circle, triangle, rect } from "../shape/shape";
export const sketch0 = () => {
  const sketch = (p: P5) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.noStroke();
      p.pixelDensity(1);
    };
  
    p.draw = () => {
      p.background(0, 0, 0);
      
  
      p.push();
      p.translate(-p.width * 0.5, -p.height * 0.5, 0.0);
      [...Array(20).keys()].forEach((x) => {
        [...Array(10).keys()].forEach((y) => {
          const shapeSize = y * 10;
          if (x % 2 === 0 && y % 2 === 0 || x % 2 !== 0 && y % 2 !== 0) {
            const positionCircle = p.createVector(x, y, 0);
            p.push();
            p.translate(
              positionCircle.x * shapeSize,
              positionCircle.y * shapeSize,
              positionCircle.z
            );
            circle(p, shapeSize);
            p.pop();
          } else if (x % 2 !== 0 && y % 2 === 0) {
            const positionRect = p.createVector(x, y, 0);
            p.push();
            p.translate(
              positionRect.x * shapeSize,
              positionRect.y * shapeSize,
              positionRect.z
            );
            rect(p, shapeSize);
            p.pop();
          } else if (x % 2 === 0 && y % 2 !== 0) {
            const trianglePosition = p.createVector(x, y, 0);
            p.push();
            p.translate(
              trianglePosition.x * shapeSize,
              trianglePosition.y * shapeSize,
              trianglePosition.z
            );
            triangle(p, shapeSize);
            p.pop();
          }
        });
      });
      p.pop();
    };
  
    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };
  
  new P5(sketch);
  
}