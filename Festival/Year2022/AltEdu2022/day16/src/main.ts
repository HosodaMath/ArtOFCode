import P5 from "p5";
// import * as Eases from "eases";
import { sankuzushi } from "./traditionalJapanesePattern/sankuzushi";
import { createFullScreen } from "./window/window";
import "sanitize.css";
import "./style.css";
const gameBody = document.body;
createFullScreen(gameBody);
const sketch = (p: P5) => {
  let canvas: P5.Graphics;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    p.pixelDensity(1);

    canvas = p.createGraphics(p.width, p.height, p.P2D);
    canvas.noStroke();

    sankuzushi(canvas);
  };

  p.draw = () => {
    p.background(255, 255, 255, 255);

    p.push();
    p.translate(-p.width * 0.5, -p.height * 0.5, 0);
    p.image(canvas, 0, 0);
    p.pop();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new P5(sketch);
