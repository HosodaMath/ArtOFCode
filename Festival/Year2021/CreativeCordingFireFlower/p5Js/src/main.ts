import * as P5 from "p5";
import * as GLMath from "./math/GLMath";
import * as Shader from "./shader/shader";
import * as Particle from "./particle/particle";
import "sanitize.css";
import "./main.css";

const sketch = (p: P5) => {
  let fire_flower: Particle.FireFlower[] = [];
  let moonNight: P5.Shader;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    moonNight = Shader.initMoonNight(p);
  };

  const createFireFlower = () => {
    const MAX = 50;
    [...Array(MAX).keys()].forEach((count) => {
      const fireLocation = new GLMath.Vector2(0.0, 0.0);
      const fireVelocity = new GLMath.Vector2(p.random(-1, 1), p.random(-1, 1));
      const fireSize = 2.0;
      const fireColor = p.color(`hsla(${count * 7}, 100%, 50%, 0.5)`);

      fire_flower.push(
        new Particle.FireFlower(
          p,
          fireLocation,
          fireVelocity,
          fireSize,
          fireColor
        )
      );
    });
  };

  const addFireFlower = () => {
    if (p.frameCount % 120 === 1) {
      createFireFlower();
    }

    if (fire_flower.length > 60) {
      fire_flower.splice(0, 1);
    }
  };

  const renderFireFlower = () => {
    [...Array(fire_flower.length).keys()].forEach((count) => {
      fire_flower[count].updateParticle();
      fire_flower[count].drawParticle();
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
