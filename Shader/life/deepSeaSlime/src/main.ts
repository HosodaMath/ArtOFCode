/**
 * Fractal Brown Motion2

 * この場合は座標データを送信している
 * シェーダーデータ送信順
 * JavaScript -> vertexShader -> fragmentShader
 */
import * as P5 from "p5";
import "sanitize.css";
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
    // そのままシェーダーに送信すると早すぎるので0.01かけて遅くする
    shader.setUniform("time", p.frameCount * 0.01);
    // シェーダーに座標データを送る
    shader.setUniform("resolution", [p.width, p.height]);
    p.rect(0, 0, p.width, p.height);
  };

  p.resizeCanvas = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new P5(sketch);
