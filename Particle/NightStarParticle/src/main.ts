/**
 * StarParticleを使用
 * 中心から一定間隔で出力する。
 * @todo NightStarParticle -> 😌
 */
import * as P5 from "p5";
import * as Vector from "./vector/vector2";
import * as Particle from "./particle/particle";
import "sanitize.css";
const sketch = (p: P5) => {
  const MAX = 30;
  let fillColor: string[] = [];
  let strokeColor: string[] = [];
  let particle: Particle.StarParticle[] = [];
  /**
   * Particle生成の準備
   */
  const createParticle = () => {
    [...Array(MAX).keys()].forEach((_count) => {
      // init Particle
      // Particle座標の初期化
      const initPositionX = p.width / 2.0;
      const initPositionY = -100;

      const position = new Vector.Vector2(initPositionX, initPositionY);

      // Particle速度の初期化
      const initVelocityX = p.random(-5, 5);
      const initVelocityY = p.random(-5, 0);
      const velocity = new Vector.Vector2(initVelocityX, initVelocityY);

      // Particle加速度の初期化
      const initAccelerationX = 0.0;
      const initAccelerationY = 0.05;
      const acceleration = new Vector.Vector2(
        initAccelerationX,
        initAccelerationY
      );

      // Patricleの大きさの初期化
      const initRadius = p.random(20, 50);
      const radius = initRadius;

      const ci = new Particle.StarParticle(
        p,
        position,
        velocity,
        acceleration,
        radius,
        5
      );
      particle.push(ci);

      // init ParticleColor
      // fill and stroke color
      const alpha = p.random(0.2, 1.0);
      const fillColorData = [
        `rgba(255, 216, 255, ${alpha})`,
        `rgba(255, 255, 216, ${alpha})`,
        `rgba(216, 255, 255, ${alpha})`,
      ];
      const strokeColorData = [
        `rgba(255, 216, 255, 1.0)`,
        `rgba(255, 255, 216, 1.0)`,
        `rgba(216, 255, 255, 1.0)`,
      ];

      const choiceFillColor = p.floor(p.random(0, fillColorData.length));
      const choiceStrokeColor = choiceFillColor;
      fillColor.push(fillColorData[choiceFillColor]);
      strokeColor.push(strokeColorData[choiceStrokeColor]);
    });
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);
  };

  const background = () => {
    p.background("rgba(0, 0, 10, 0.1)");
  };

  /**
   * 一定間間でParticleを生成と削除する
   */
  const addParticle = () => {
    // 数字を大きくすると生成間隔が長くなり小さくすると生成間隔は短くなる。
    if (p.frameCount % 180 === 1) {
      createParticle();
    }

    if (particle.length > 60) {
      particle.splice(0, 1);
    }
  };

  /**
   * Particleを描画する
   */
  const renderParticle = () => {
    [...Array(particle.length).keys()].forEach((count) => {
      particle[count].updateParticle(false);
      particle[count].drawParticle(fillColor[count], strokeColor[count]);
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
