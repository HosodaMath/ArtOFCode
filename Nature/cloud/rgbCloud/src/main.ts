import P5 from "p5";
import "sanitize.css";
import "./style.css";
import colors from "./image/noise.png";
import rgbCloudVertexShader from "./shader/rgbCloud/rgbCloud.vert?raw";
import rgbCloudFragmentShader from "./shader/rgbCloud/rgbCloud.frag?raw";

const sketch = (p: P5) => {
  let colors_image: P5.Image;
  let shader: P5.Shader;
  p.preload = () => {
    colors_image = p.loadImage(colors);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();

    shader = p.createShader(
      rgbCloudVertexShader,
      rgbCloudFragmentShader
    );
  };

  p.draw = () => {
    p.background(0, 0, 0);

    p.shader(shader);
    shader.setUniform("uTexture", colors_image);
    shader.setUniform("uFrameCount", p.frameCount * 0.5);
    p.push();
    p.translate(
      -p.width * 0.5 + p.width * 0.5,
      -p.height * 0.5 + p.height * 0.5
    );
    p.plane(p.width, p.height, 200, 200);
    p.pop();
    p.resetShader();
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
