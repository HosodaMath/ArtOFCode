import P5 from "p5";
import { pattern5 } from "./pattern/pattern";
import { backgroundPaint } from "./background/backgroundPaint";
import { createStartWindow, createFullScreen } from "./window/window";
import GradationVertexShader1 from "./shader/gradation/gradationCommon.vert?raw";
import GradationFragmentShader1 from "./shader/gradation/gradation2.frag?raw";
import "sanitize.css";
import "./style.css";

const gameBody = document.body;
const startSystem = createStartWindow(gameBody);
createFullScreen(gameBody);
startSystem.startButton.addEventListener("click", () => {
  gameBody.removeChild(startSystem.startWindow);
  const sketch = (p: P5) => {
    const DEGREE_MAX = 360;
    const width = 512;
    const height = 512;
    let mainShader: P5.Shader;
    p.setup = () => {
      p.createCanvas(width, height, p.WEBGL);
      p.noStroke();
      p.pixelDensity(1);
      p.smooth();

      mainShader = p.createShader(
        GradationVertexShader1,
        GradationFragmentShader1
      );
    };

    p.draw = () => {
      p.noLoop();
      p.background(0, 0, 0);

      backgroundPaint(p, mainShader);
      const loopCalc = Math.floor(width * 0.01);
      const loopMaxX = loopCalc;
      const loopMaxY = loopMaxX;
      const multiScale = 10;
      const scaleMax = 5;
      const shiftValue = multiScale * scaleMax;
      const width2 = -p.width * 0.5 + shiftValue;
      const height2 = -p.height * 0.5 + shiftValue;
      p.push();
      p.translate(width2, height2);
      [...Array(loopMaxX).keys()].forEach((positionX) => {
        [...Array(loopMaxY).keys()].forEach((positionY) => {
          p.push();
          p.translate(positionX * 100, positionY * 100, 0);
          // pattern1(p, DEGREE_MAX, multiScale, scaleMax);
          // pattern2(p, DEGREE_MAX, multiScale, scaleMax);
          // pattern3(p, DEGREE_MAX, multiScale, scaleMax);
          // pattern4(p, DEGREE_MAX, multiScale, scaleMax);
          pattern5(p, DEGREE_MAX, multiScale, scaleMax);
          p.pop();
        });
      });
      p.pop();
    };

    p.windowResized = () => {
      p.resizeCanvas(width, height);
    };
  };

  new P5(sketch);
});
