/**
 * 中心から一定間隔で出力する。
 */
import * as P5 from "p5";
import * as Vector from "./vector/vector2";
import { NormalParticle } from "./particle/normal_particle";
import "sanitize.css";
const sketch = (p: P5) => {
  const MAX = 20;
  let particle: NormalParticle[] = [];
  /**
   * Particle生成の準備
   */
  const createParticle = () => {
    [...Array(MAX).keys()].forEach((_count) => {
      // const initPositionX = p.random(0, p.width);
      // const initPositionY = p.random(0, p.height);
      const initPositionX = p.width / 2.0;
      const initPositionY = p.height / 2.0;
      const position = new Vector.Vector2(initPositionX, initPositionY);

      const initVelocityX = p.random(-5, 5);
      const initVelocityY = p.random(-5, 5);
      const velocity = new Vector.Vector2(initVelocityX, initVelocityY);

      const initRadius = p.random(10, 20);
      const radius = initRadius;

      const ci = new NormalParticle(p, position, velocity, radius);
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
    // 数字を大きくすると生成間隔が長くなり小さくすると生成間隔は短くなる。
    if (p.frameCount % 180 === 1) {
      createParticle();
    }

    if (particle.length > 40) {
      particle.splice(0, 1);
    }
  };

  /**
   * Particleを描画する
   */
  const renderParticle = () => {
    // const fillColor = ["rgba(0, 200, 200, 0.8)"];
    // const strokeColor = ["rgba(50, 220, 200, 1.0)"];
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
