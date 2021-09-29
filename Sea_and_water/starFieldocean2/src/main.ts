import * as P5 from "p5";
import * as StarField from "./draw/starField/drawStar";
import * as Particle from "./draw/particle/particle";
import * as Color from "./color/color";
import * as Shader from "./shader/shader";
import "sanitize.css";
import "./main.css";

const sketch = (p: P5) => {
  // Bckgorund Texture
  const particleMax = 200;
  let backgroundTexture: P5.Graphics;
  let particleParameter: Particle.MiniParticleTextureParameter;
  // Create StarField Texture
  const starMax = 100;
  let starFieldCanvas: P5.Graphics;
  let starPosition: P5.Vector[] = [];
  let starVelocity: P5.Vector[] = [];
  let starSize: number[] = [];
  let starColor: string[] = [];
  let starFieldSize: number[] = [];
  let theta: number[] = [];

  // mainShader
  let mainTexture: P5.Graphics;

  const initMiniParticle = (backgroundTexture: P5.Graphics) => {
    let particlePosition: P5.Vector[] = [];
    let particleVelocity: P5.Vector[] = [];
    let particleSize: number[] = [];
    [...Array(particleMax).keys()].forEach((_count) => {
      const initParticlePosition = backgroundTexture.createVector(
        backgroundTexture.random(0, backgroundTexture.width),
        backgroundTexture.random(0, backgroundTexture.height)
      );
      particlePosition.push(initParticlePosition);

      const initParticleVelocity = backgroundTexture.createVector(
        0,
        backgroundTexture.random(0.05, 0.5)
      );
      particleVelocity.push(initParticleVelocity);

      const initParticleSize = backgroundTexture.random(1, 3);
      particleSize.push(initParticleSize);
    });

    particleParameter = {
      canvas: backgroundTexture,
      position: particlePosition,
      velocity: particleVelocity,
      size: particleSize,
    };
  };

  const initStarField = (starFieldCanvas: P5.Graphics) => {
    [...Array(starMax).keys()].forEach((_count) => {
      const initStarPosition = starFieldCanvas.createVector(0, 0);
      starPosition.push(initStarPosition);

      const initStarVelocity = starFieldCanvas.createVector(0.01, 0.01);
      starVelocity.push(initStarVelocity);

      const initStarSize = starFieldCanvas.random(2, 3);
      starSize.push(initStarSize);

      const initStarColor = Color.createRandomColor();
      starColor.push(initStarColor);

      const initStarFieldSize = starFieldCanvas.random() * 400;
      starFieldSize.push(initStarFieldSize);

      theta.push(starFieldCanvas.random() * starFieldCanvas.PI * 2);
    });
  };

  p.setup = () => {
    p.createCanvas(680, 480, p.WEBGL);
    //p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    p.pixelDensity(1);

    backgroundTexture = p.createGraphics(p.width, p.height, p.P2D);
    backgroundTexture.noStroke();
    initMiniParticle(backgroundTexture);

    starFieldCanvas = p.createGraphics(p.width, p.height, p.P2D);
    starFieldCanvas.noStroke();
    initStarField(starFieldCanvas);

    mainTexture = p.createGraphics(p.width, p.height, p.WEBGL);
    mainTexture.noStroke();
  };

  const createBackgroundTexture = (backgroundTexture: P5.Graphics) => {
    StarField.backgroundTexture(backgroundTexture, particleParameter);
  };

  const createCanvasStarField = (starFieldCanvas: P5.Graphics) => {
    const canvas = starFieldCanvas.drawingContext.canvas.getContext("2d");
    if (!(canvas instanceof CanvasRenderingContext2D)) {
      throw new Error("Not canvas");
    }
    canvas.save();
    canvas.fillStyle = "rgba(0, 0, 0, 0.05)";
    canvas.rect(0, 0, starFieldCanvas.width, starFieldCanvas.height);
    canvas.fill();
    canvas.restore();

    const star = new StarField.StarField({
      canvas: canvas,
      position: starPosition,
      velocity: starVelocity,
      size: starSize,
      starColor: starColor,
      starFildSize: starFieldSize,
      theta: theta,
    });

    const mousePosition = p.createVector(p.mouseX, p.mouseY);
    /*
    const mousePosition = p.createVector(
      starFieldCanvas.width / 2.0,
      starFieldCanvas.height / 2.0
    );*/

    star.update(mousePosition);
    star.draw();
  };

  const renderCanvasStarField = (
    mainTexture: P5.Graphics,
    starFieldCanvas: P5.Graphics
  ) => {
    const uFrameCount = p.frameCount * 0.005;
    const uTime = uFrameCount;
    const mainTextureShader = Shader.yuragiCanvasShader(mainTexture);
    mainTexture.background("rgba(0, 0, 0, 0.05)");
    mainTexture.push();
    mainTexture.translate(
      -mainTexture.width / 2.0,
      -mainTexture.height / 2.0,
      0
    );
    mainTexture.shader(mainTextureShader);
    mainTextureShader.setUniform("uTime", uTime);
    mainTextureShader.setUniform("uTexture1", backgroundTexture);
    mainTextureShader.setUniform("uTexture2", starFieldCanvas);
    mainTexture.rect(0, 0, mainTexture.width, mainTexture.height);
    mainTexture.pop();
  };

  p.draw = () => {
    p.orbitControl();
    p.background("rgba(0, 0, 0, 1.0)");

    createBackgroundTexture(backgroundTexture);
    createCanvasStarField(starFieldCanvas);

    renderCanvasStarField(mainTexture, starFieldCanvas);

    p.push();
    //p.translate(-p.width / 2.0, -p.height / 2.0, 0.0);
    //p.image(mainTexture, 0, 0);
    p.translate(0.0, 0.0, 0.0);
    p.texture(mainTexture);
    p.plane(p.width, p.height);
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
