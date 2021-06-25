import * as P5 from "p5";
import * as Vector from "./vector/vector2";
import { Particle } from "./particle/normal_particle";
import "sanitize.css";
const sketch = (p: P5) => {
  const MAX = 20;
  let particle: Particle[] = [];
  /**
   * Particle生成の準備
   */
  const createParticle = () => {
    [...Array(MAX).keys()].forEach((_count) => {
      const position = new Vector.Vector2(p.width / 2.0, p.height / 2.0);

      const velocity_value = p.random(-5, 5);
      const velocity = new Vector.Vector2(velocity_value, velocity_value);

      const radius_value = p.random(10, 20);
      const radius = radius_value;

      const ci = new Particle(p, position, velocity, radius);
      particle.push(ci);
    });
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  const background = () => {
    p.background("rgba(0, 0, 0, 0.05)");
  };

  /**
   * 一定間間でParticleを生成と削除する
   */
  const addParticle = () => {
    if (p.frameCount % 120 === 1) {
      createParticle();
    }

    if (particle.length > 200) {
      particle.splice(0, 1);
    }
  };

  /**
   * Particleを描画する
   */
  const renderParticle = () => {
    [...Array(particle.length).keys()].forEach((count) => {
      particle[count].updateParticle();
      particle[count].drawParticle(
        "rgba(0, 200, 200, 0.8)",
        "rgba(50, 220, 200, 1.0)"
      );
    });
  };

  p.draw = () => {
    background();
    addParticle();
    renderParticle();
  };

  p.windowResized = () => {
    p.createCanvas(p.width, p.height);
  };

  p.keyTyped = () => {
    console.log(`particle: ${particle.length}`);
  };
};

new P5(sketch);
