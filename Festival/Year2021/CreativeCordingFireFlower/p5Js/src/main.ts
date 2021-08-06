import * as P5 from "p5";
import * as GLMath from "./math/GLMath";
import * as Shader from "./shader/shader";
import * as Particle from "./particle/particle";
import Texture from "./image/noise.png";
import "sanitize.css";
import "./main.css";

const sketch = (p: P5) => {
  const MAX = 20;

  let fire_flower: Particle.FireFlowerShader[] = [];
  let moonNight: P5.Shader;
  let fireFlowerShader: P5.Shader;
  let texture: P5.Image;
  p.preload = () => {
    texture = p.loadImage(Texture);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    moonNight = Shader.initMoonNight(p);
    fireFlowerShader = Shader.initFireFlowerShader(p);
  };

  const createFireFlower = () => {
    [...Array(MAX).keys()].forEach((_count) => {
      const fireLocation = new GLMath.Vector2(p.random(-1, 1), p.random(-1, 1));
      const fireVelocity = new GLMath.Vector2(p.random(-1, 1), p.random(-1, 1));
      const fireSize = p.random(10, 20);

      fire_flower.push(
        new Particle.FireFlowerShader(
          p,
          fireLocation,
          fireVelocity,
          fireSize,
          texture,
          fireFlowerShader
        )
      );
    });
  };

  const addFireFlower = () => {
    if (p.frameCount % 120 === 1) {
      createFireFlower();
    }

    if (fire_flower.length > 40) {
      fire_flower.splice(0, 1);
    }
  };

  const renderFireFlower = () => {
    [...Array(fire_flower.length).keys()].forEach((count) => {
      fire_flower[count].updateParticle();
      fire_flower[count].drawParticle([
        p.random(0.5, 1.0),
        p.random(0.5, 1.0),
        p.random(0.5, 1.0),
      ]);
    });
  };

  p.draw = () => {
    p.orbitControl();

    p.background("rgba(10, 10, 20, 1.0)");
    Shader.drawMoonNight(p, moonNight);
    addFireFlower();
    renderFireFlower();
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

  p.keyTyped = () => {
    console.log(fire_flower.length);
  };
};

new P5(sketch);
