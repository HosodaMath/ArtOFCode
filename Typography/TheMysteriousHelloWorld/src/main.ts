/**
 * 1. P5.Graficsで2Dあるいは3Dテクスチャを作成する。
 * 2. P5.Gradicsで3D文字テクスチャを作成する。
 * 3. Shaderにこれらを適用する。
 *
 */
import P5 from "p5";
import * as MainDraw from "./main_draw/draw";
import * as CanvasTexture from "./texture/canvasTexture";
import * as Shader from "./shader/shader";
import "sanitize.css";
import "./style.css";
import Inconsolata from "./fonts/inconsolata.otf";
import NoiseImage from "./image/noise.png";

const sketch = (p: P5) => {
  const textureCanvasSize1 = p.createVector(800, 800);
  const textureCanvasSize2 = textureCanvasSize1;

  let mainShader: P5.Shader;
  let polkaDotsTexture: P5.Graphics;
  let textTexture: P5.Graphics;
  let noiseTexture: P5.Image;
  let drawingTextFont: P5.Font;
  p.preload = () => {
    drawingTextFont = p.loadFont(Inconsolata);
    noiseTexture = p.loadImage(NoiseImage);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();

    mainShader = Shader.createShader(p);

    polkaDotsTexture = p.createGraphics(
      textureCanvasSize1.x,
      textureCanvasSize1.y,
      p.P2D
    );

    textTexture = p.createGraphics(
      textureCanvasSize2.x,
      textureCanvasSize2.y,
      p.WEBGL
    );

    textTexture.textFont(drawingTextFont);
    textTexture.textSize(textTexture.width * 0.5);
    textTexture.textAlign(textTexture.CENTER, textTexture.CENTER);
  };

  const mainRendering = () => {
    const canvasTexture = new CanvasTexture.PolkaDots(polkaDotsTexture);
    canvasTexture.drawPolkaDotsColor(p.color(100, 200, 200));

    const texture = new CanvasTexture.CreateTextTexture(
      textTexture,
      "Hello World!!"
    );
    const uFrameCount = p.frameCount;
    texture.createTextTexture(uFrameCount);

    const textureData = [polkaDotsTexture, noiseTexture, textTexture];
    const locationData = p.createVector(0.0, 0.0, 0.0);
    const draw = new MainDraw.DrawShader(p, textureData, locationData);
    draw.drawSinWave(mainShader);
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
