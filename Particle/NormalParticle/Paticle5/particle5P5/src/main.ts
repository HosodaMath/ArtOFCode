/**
 * NormalParticleを使用
 * 中心から一定間隔で出力する。
 * @todo 軌道に乱数を加える
 * @todo 軌道にNoiseを加える
 * @todo 軌道に三角関数を加える
 * @todo 軌道に重力を加える -> 中断
 */
import * as P5 from "p5";
import * as Vector from "./vector/vector2";
import * as Particle from "./particle/particle";
import "sanitize.css";
const sketch = (p: P5) => {
  const MAX = 20;
  let fillColor: string[] = [];
  let strokeColor: string[] = [];
  let particle: Particle.NormalParticle[] = [];
  /**
   * Particle生成の準備
   */
  const createParticle = () => {
    const fillColorData = [
      "rgba(255, 216, 255, 0.8)",
      "rgba(255, 255, 216, 0.8)",
      "rgba(216, 255, 255, 0.8)",
    ];
    const strokeColorData = [
      "rgba(255, 216, 255, 1.0)",
      "rgba(255, 255, 216, 1.0)",
      "rgba(216, 255, 255, 1.0)",
    ];
    [...Array(MAX).keys()].forEach((_count) => {
      // init Particle
      // Particle座標の初期化
      // 基本用
      const initPositionX = p.width / 2.0;
      const initPositionY = p.height / 2.0;

      // カスタマイズ用
      // const initPositionX = p.random(0, p.width);
      // const initPositionY = p.random(0, p.height);
      const position = new Vector.Vector2(initPositionX, initPositionY);

      // Particle速度の初期化
      // 基本用
      // const initVelocityX = p.random(-5, 5);
      // const initVelocityY = p.random(-5, 5);

      // カスタマイズ用
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
      const initRadius = p.random(10, 20);
      const radius = initRadius;

      const ci = new Particle.NormalParticle(
        p,
        position,
        velocity,
        acceleration,
        radius
      );
      particle.push(ci);

      // init ParticleColor
      // fill and stroke color
      const choiceFillColor = p.floor(p.random(0, fillColorData.length));
      const choiceStrokeColor = choiceFillColor;
      fillColor.push(fillColorData[choiceFillColor]);
      strokeColor.push(strokeColorData[choiceStrokeColor]);
    });
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  const background = () => {
    p.background("rgba(216,216,255, 0.5)");
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
