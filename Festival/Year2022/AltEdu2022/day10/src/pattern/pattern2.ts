import P5 from "p5";
import { Calc } from "../mathematics/calc";
const divValue = 3;
const radius = 5;
const shiftX = radius;

export const pattern2 = (
  p: P5,
  degreeMax: number,
  multiScale: number,
  scaleMax: number
) => {
  [...Array(degreeMax).keys()].forEach((degree) => {
    [...Array(scaleMax).keys()].forEach((colorSpace) => {
      if (degree % divValue === 0) {
        const radian = Calc.degTorad(degree);
        const position = p.createVector(
          p.cos(radian * 10) * colorSpace * multiScale,
          p.sin(radian) * colorSpace * multiScale,
          0
        );
        const radianMulti = 10;
        const radius2 = radius * Math.cos(radian * radianMulti) + shiftX;
        p.push();
        const r = colorSpace * 10;
        const g = colorSpace * 50;
        const b = 150;
        const alpha = 200;
        p.fill(p.color(r, g, b, alpha));
        p.translate(position.x, position.y);
        p.ellipse(0, 0, radius2, radius2);
        p.pop();
      }
    });
  });
};
