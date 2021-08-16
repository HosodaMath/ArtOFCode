/**
 * Sea Wave and Texture
 */
import P5 from "p5";
import "sanitize.css";
import "./style.css";
import NoiseImage from "./image/noise.png";
import waterSeaTextureVertexShader from "./shader/water_sea/water_sea.vert?raw";
import waterTextureFragmentShader from "./shader/water_sea/water_sea.frag?raw";
import ringTextureVertexShader from "./shader/water_sea/ring.vert?raw";
import ringTextureFragmentShader from "./shader/water_sea/ring.frag?raw";

const sketch = (p: P5) => {
  let colors_image: P5.Image;
  let waterShader: P5.Shader;
  let ringTextureShader: P5.Shader;

  p.preload = () => {
    colors_image = p.loadImage(NoiseImage);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();

    waterShader = p.createShader(
      waterSeaTextureVertexShader,
      waterTextureFragmentShader
    );

    ringTextureShader = p.createShader(
      ringTextureVertexShader,
      ringTextureFragmentShader
    );
  };

  const renderWater = () => {
    const mouseX = p.map(p.mouseX, 0, p.width, 0.5, 1);
    const mouseY = p.map(p.mouseY, 0, p.height, 0.5, 1);

    p.push();
    p.shader(waterShader);
    waterShader.setUniform("uResolution", [p.width, p.height]);
    waterShader.setUniform("uTime", p.frameCount);
    waterShader.setUniform("uMouse", [mouseX, mouseY]);
    // p.fill(200, 200, 100);
    p.translate(-p.width / 2.0, -p.height / 2.0, 0);
    p.rect(0, 0, p.width, p.height);
    p.resetShader();
    p.pop();
  };

  const renderRing = () => {
    const mouseX = p.map(p.mouseX, 0, p.width, 0, 1);
    const mouseY = p.map(p.mouseY, 0, p.height, 0, 1);

    p.push();
    p.shader(ringTextureShader);
    ringTextureShader.setUniform("uResolution", [p.width, p.height]);
    ringTextureShader.setUniform("uMouse", [mouseX, mouseY]);
    ringTextureShader.setUniform("uTime", p.frameCount);
    ringTextureShader.setUniform("uTexture", colors_image);
    p.translate(0.0, 0.0, 0.0);
    p.sphere(p.width / 6.0, 200, 200);
    p.resetShader();
    p.pop();
  };

  p.draw = () => {
    p.orbitControl();
    p.background("rgba(0, 0, 0, 1.0)");

    renderWater();
    renderRing();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.keyPressed = () => {
    if (p.keyCode === p.LEFT_ARROW) {
      const element = document.body;
      element.requestFullscreen();
    }
  };
};

new P5(sketch);
