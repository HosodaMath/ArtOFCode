import * as P5 from "p5";
import * as Vector from "./math/vector";
import * as Particle from "./particle/particle";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./main.css";

const sketch = (p: P5) => {
  // 基本画面サイズ
  const width = p.width;
  const height = p.height;
  const depth = p.width;
  const width2 = width / 2.0;
  const height2 = height / 2.0;
  const depth2 = depth / 2.0;

  let shader: P5.Shader;
  let position: Vector.Vector3[];
  let radius: number[];
  // 揺らぎ
  let furufuru: Vector.Vector3[];

  p.preload = () => {
    shader = p.loadShader("shader.vert", "shader.frag");
  };

  const createTorus = () => {
    position = [];
    radius = [];
    furufuru = [];
    [...Array(10).keys()].forEach((_count) => {
      const initPosition = new Vector.Vector3(
        p.random(-width2, width2),
        p.random(-height2, height2),
        p.random(-depth2, 0.0)
      );
      position.push(initPosition);

      const initSize = p.width * 0.08;
      radius.push(initSize);

      const initFuruFuru = new Vector.Vector3(
        p.random(1.0, 4.0),
        p.random(0.1, 0.2),
        0.0
      );
      furufuru.push(initFuruFuru);
    });
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    // p.debugMode();
    createTorus();
  };

  const initCamera = () => {
    p.orbitControl();
    // p.camera(0, 0, 0 + p.sin(p.frameCount * 0.01) * 10, 0, 0, 0, 0, 1, 0);
  };

  const initShader = () => {
    p.shader(shader);

    // 頂点シェーダーのframecountの情報を渡す
    shader.setUniform("uFrameCount", p.frameCount);
    p.push();
    [...Array(radius.length).keys()].forEach((count) => {
      p.push();
      position[count].x += p.cos(p.frameCount * 0.01) * furufuru[count].x;
      position[count].y += p.sin(p.frameCount * 0.01) * furufuru[count].y;
      position[count].z += p.tan(p.frameCount * 0.01) * furufuru[count].z;
      p.translate(position[count].x, position[count].y, position[count].z);

      p.torus(radius[count], 10.0, 200.0, 200.0);
      p.pop();
    });
    p.pop();
  };

  p.draw = () => {
    p.background("rgba(0, 0, 0, 0.0)");

    initCamera();
    initShader();
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
