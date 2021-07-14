/**
 * StarField
 * JavaScript -> vertexShader -> fragmentShader
 */
import * as P5 from "p5";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const sketch = (p: P5) => {
  let shader: P5.Shader;

  p.preload = () => {
    shader = p.loadShader("shader.vert", "shader.frag");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
  };

  p.draw = () => {
    p.shader(shader);
    // シェーダーに時間データを送る
    shader.setUniform("time", p.frameCount * 0.05);
    // シェーダーに座標データを送る
    shader.setUniform("resolution", [p.width, p.height]);
    p.rect(0, 0, p.width, p.height);
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
