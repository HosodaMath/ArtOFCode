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
import DrawVertexShader from "./main_draw/draw.vert?raw";
import DrawFragmentShader from "./main_draw/draw.frag?raw";

const sketch = (p: P5) => {
  const textureCanvasSize1 = p.createVector(800, 800);

  let mainShader: P5.Shader;
  let polkaDotsTexture: P5.Graphics;
  let noiseTexture: P5.Image;
  let drawingTextFont: P5.Font;

  p.preload = () => {
    drawingTextFont = p.loadFont(Inconsolata);
    noiseTexture = p.loadImage(NoiseImage);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    // p.colorMode(p.HSL, 360, 100, 100);
    p.noStroke();

    mainShader = Shader.createShader(p, DrawVertexShader, DrawFragmentShader);

  
    polkaDotsTexture = p.createGraphics(textureCanvasSize1.x, textureCanvasSize1.y, p.P2D);
  };

  const mainRendering = () => {
    const canvasTexture = new CanvasTexture.PolkaDots(polkaDotsTexture);
    canvasTexture.drawPolkaDotsColor(p.color(100, 200, 200));
    
    const textureData = [polkaDotsTexture, noiseTexture];
    const locationData = p.createVector(0.0, 0.0, 0.0);
    const velocityData = p.createVector(0.0, 0.0, 0.0);
    const draw = new MainDraw.DrawShader(
      p,
      textureData,
      locationData,
      velocityData
    );

    draw.drawMulti(mainShader);
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
