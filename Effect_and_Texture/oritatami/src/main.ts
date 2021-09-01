import P5 from "p5";
import * as MainDraw from "./main_draw/draw";
import * as Shader from "./shader/shader";
import "sanitize.css";
import "./style.css";
import NoiseImage from "./image/noise.png";

const sketch = (p: P5) => {
  let mainShader: P5.Shader;
  let noiseTexture: P5.Image;
  p.preload = () => {
    noiseTexture = p.loadImage(NoiseImage);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();

    mainShader = Shader.createShader(p);
  };

  const mainRendering = () => {
    const texture = [noiseTexture];
    const drawLocation = p.createVector(-p.width / 2.0, -p.height / 2.0, 0);
    const oritatami = new MainDraw.DrawShader(p, texture, drawLocation);
    oritatami.drawOritatami(mainShader);
  };

  p.draw = () => {
    p.orbitControl();
    p.background(0, 0, 0);

    mainRendering();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.keyPressed = () => {
    // Full Screen Mode
    if (p.key === "f") {
      const element = document.body;
      element.requestFullscreen();
    }

    // Save Canvas png
    if (p.key === "s") {
      p.saveCanvas(
        `file${p.year()}_${p.month()}_${p.day()}_${p.hour()}_${p.minute()}`,
        "png"
      );
    }
  };
};

new P5(sketch);
