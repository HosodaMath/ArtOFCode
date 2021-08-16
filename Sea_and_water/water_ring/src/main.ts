/**
 * Noise Wave 3D
 */
import P5 from "p5";
// import * as Draw from "./draw_p5/draw_p5";
import "sanitize.css";
import "./style.css";
// import colorVertexShader from "./shader/color/color.vert?raw";
// import colorFragmentShader from "./shader/color/color.frag?raw";
import gradationVertexShader from "./shader/grad/gradation.vert?raw";
import gradationFragmentShader from "./shader/grad/gradation.frag?raw";

const sketch = (p: P5) => {
  // let shader: P5.Shader;
  let gradationShader: P5.Shader;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    // shader = p.createShader(colorVertexShader, colorFragmentShader);
    gradationShader = p.createShader(
      gradationVertexShader,
      gradationFragmentShader
    );
  };

  const renderWater = () => {
    p.push();
    p.shader(gradationShader);
    gradationShader.setUniform("uResolution", [p.width, p.height]);
    gradationShader.setUniform("uTime", p.frameCount);
    p.translate(-p.width / 2.0, -p.height / 2.0, 0);
    p.rect(0, 0, p.width, p.height);
    p.resetShader();
    p.pop();
  };

  p.draw = () => {
    p.orbitControl();
    p.background("rgba(0, 0, 0, 1.0)");

    renderWater();
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
