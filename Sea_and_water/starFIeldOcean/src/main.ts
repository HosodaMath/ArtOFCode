import * as P5 from "p5";
import * as StarWorld from "./draw/draw";
import * as Shader from "./shader/shader";
import NoiseImage from "./assets/noise.png";
import PlantsImage from "./assets/plants.png";
import "sanitize.css";
import "./main.css";

const sketch = (p: P5) => {
  const starMax = 200;
  let starFieldCanvas: P5.Graphics;
  let mainTexture: P5.Graphics;
  let starFieldPosition: P5.Vector[] = [];
  let starSize: number[] = [];
  let starFieldColor: string[] = [];

  let noiseImage: P5.Image;
  let plantsImage: P5.Image;

  p.preload = () => {
    noiseImage = p.loadImage(NoiseImage);
    plantsImage = p.loadImage(PlantsImage);
  };

  const setStarField = (backgroundCanvas: P5.Graphics) => {
    const starColorData = [
      "rgba(230, 230, 150, 1.0)",
      "rgba(150, 230, 230, 1.0)",
      "rgba(150, 230, 150, 1.0)",
      "rgba(150, 150, 230, 1.0)",
    ];
    [...Array(starMax).keys()].forEach((_starCount) => {
      const starPosition = backgroundCanvas.createVector(
        backgroundCanvas.random(0, backgroundCanvas.width),
        backgroundCanvas.random(0, backgroundCanvas.height)
      );
      starFieldPosition.push(starPosition);

      const initStarSize = backgroundCanvas.floor(
        p.random(p.height * 0.01, p.height * 0.02)
      );
      starSize.push(initStarSize);

      const choice = backgroundCanvas.floor(
        backgroundCanvas.random(0, starColorData.length)
      );

      starFieldColor.push(starColorData[choice]);
    });
  };

  p.setup = () => {
    p.createCanvas(680, 480, p.WEBGL);
    //p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    p.pixelDensity(1);

    starFieldCanvas = p.createGraphics(p.width, p.height, p.P2D);
    starFieldCanvas.noStroke();
    setStarField(starFieldCanvas);

    mainTexture = p.createGraphics(p.width, p.height, p.WEBGL);
    mainTexture.noStroke();
  };

  const createMainTexture = () => {
    const uFrameCount = p.frameCount * 0.005;
    const uTime = uFrameCount;
    const mainTextureShader = Shader.yuragiCanvasShader(mainTexture);
    mainTexture.background(0, 0, 0);
    mainTexture.push();
    mainTexture.translate(
      -mainTexture.width / 2.0,
      -mainTexture.height / 2.0,
      0
    );
    mainTexture.shader(mainTextureShader);

    mainTextureShader.setUniform("uTime", uTime);
    mainTextureShader.setUniform("uTexture1", plantsImage);
    mainTextureShader.setUniform("uTexture2", starFieldCanvas);
    mainTexture.rect(0, 0, mainTexture.width, mainTexture.height);
    mainTexture.pop();
  };

  const createStarFieldTexture = () => {
    StarWorld.StarField(
      starFieldCanvas,
      starFieldPosition,
      starSize,
      starFieldColor
    );
  };

  p.draw = () => {
    // p.orbitControl();
    p.background(0, 0, 0);

    createStarFieldTexture();
    createMainTexture();

    p.push();
    p.translate(-p.width / 2.0, -p.height / 2.0, 0);
    p.image(mainTexture, 0, 0);
    p.pop();
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
