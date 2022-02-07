import P5 from "p5";
import { createStartWindow, createFullScreen } from "./window/window";
import "sanitize.css";
import "./main.css";

const gameBody = document.body;
const startSystem = createStartWindow(gameBody);
createFullScreen(gameBody);
startSystem.startButton.addEventListener("click", () => {
  gameBody.removeChild(startSystem.startWindow);
  const sketch = (p: P5) => {
    const DEGREE_MAX = 360;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
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
      const frameCount = p.frameCount * 0.005;
      const scaleMax = 10;
      p.push();
      p.beginShape();
      p.translate(0, 0, 0);
      [...Array(DEGREE_MAX).keys()].forEach((degree) => {
        [...Array(scaleMax).keys()].forEach((scale) => {
          if (degree % divValue === 0) {
            const radian = degTorad(degree);
            const position = p.createVector(
              p.cos(radian * frameCount) * scale * multi,
              p.sin(radian * frameCount) * scale * multi,
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
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  new P5(sketch);
});
