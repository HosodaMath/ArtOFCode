import P5 from "p5";
import { canvasWidth, canvasHeight } from "../constant/constant";
export const sketch = (p: P5) => {
  const DEGREE_MAX = 360;
  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight, p.WEBGL);
    p.noStroke();
    p.pixelDensity(1);
    p.smooth();
  };

  const degTorad = (degree: number) => {
    return (degree * p.PI) / 180;
  };

  p.draw = () => {
    p.background(p.color("rgba(0, 0, 50, 1.0)"));
    const divValue = 3;
    const radius = 5;
    const shiftX = radius;
    const multi = 30;
    const scaleMax = 8;
    p.push();
    p.beginShape();
    p.translate(0, 0, 0);
    [...Array(DEGREE_MAX).keys()].forEach((degree) => {
      [...Array(scaleMax).keys()].forEach((scale) => {
        if (degree % divValue === 0) {
          const radian = degTorad(degree);
          const position = p.createVector(
            p.cos(radian) * scale * multi,
            p.sin(radian) * scale * multi,
            0
          );
          const radianMulti = 10;
          const radius2 = radius * Math.cos(radian * radianMulti) + shiftX;
          p.push();
          p.fill(p.color(scale * 30, scale * 30, 250, 200));
          p.ellipse(position.x, position.y, radius2, radius2);
          p.pop();
        }
      });
    });
    p.endShape();
    p.pop();

    p.noLoop();
  };
};