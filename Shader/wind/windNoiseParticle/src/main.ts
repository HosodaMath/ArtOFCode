import * as P5 from "p5";
import * as Audio from "./audio";
import * as Vector from "./math/vector";
import "sanitize.css";
import "./main.css";

const sketch = (p: P5) => {
  let shader: P5.Shader;
  let noise: P5.Image;
  let position: Vector.Vector3[] = [];
  let velocity: Vector.Vector3[] = [];
  p.preload = () => {
    shader = p.loadShader("shader.vert", "shader.frag");
    noise = p.loadImage("./texture/noise4.png");
  };

  const setAudio = () => {
    Audio.audioPlay();
    Audio.audioStop();
  };

  const setParticle = () => {
    [...Array(10).keys()].forEach((count) => {
      position.push(
        new Vector.Vector3(
          p.random(-p.width / 2.0, p.width / 2.0),
          p.random(p.height + 20, p.height + 50),
          p.random(-p.width / 2.0, p.width / 2.0)
        )
      );

      velocity.push(new Vector.Vector3(p.random(-0.5, 0.5), p.random(1, 2), 0));
    });
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    setAudio();
    setParticle();
  };

  const camera = () => {
    p.orbitControl();
  };

  const addParticle = () => {
    // p.push();
    [...Array(position.length).keys()].forEach((count) => {
      position[count].sub(velocity[count]);
      position[count].x += p.random(-0.5, 0.5);
      p.push();
      p.translate(position[count].x, position[count].y, position[count].z);
      if (position[count].y < -p.height / 2.0 - 400) {
        position[count].x = p.random(-p.width / 2.0, p.width / 2.0);
        position[count].y = p.random(p.height + 20, p.height + 50);
        position[count].z = p.random(-p.width / 2.0, p.width / 2.0);
      }

      p.rotateX(p.frameCount * 0.01);
      p.rotateY(p.frameCount * 0.01);

      p.sphere(p.width * 0.05, 200, 200);
      p.pop();
    });
    // p.pop();
  };

  p.draw = () => {
    camera();
    p.background("rgba(255, 255, 255, 0.0)");
    p.shader(shader);

    shader.setUniform("uFrameCount", p.frameCount * 0.5);
    shader.setUniform("uNoiseTexture", noise);

    addParticle();
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
