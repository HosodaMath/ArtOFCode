/**
 * NormalParticle3を使用
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
  let particle: Particle.NormalParticle3[] = [];
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
      // const initPositionX = p.random(0, p.width);
      // const initPositionY = p.random(0, p.height);
      const initPositionX = p.width / 2.0;
      const initPositionY = p.height / 2.0;
      const position = new Vector.Vector2(initPositionX, initPositionY);

      // 基本用
      // const initVelocityX = p.random(-5, 5);
      // const initVelocityY = p.random(-5, 5);
      
      // カスタマイズ用
      const initVelocityX = p.random(-1, 1);
      const initVelocityY = p.random(-1, 1);
      
      const velocity = new Vector.Vector2(initVelocityX, initVelocityY);

      const initRadius = p.random(10, 20);
      const radius = initRadius;

      const ci = new Particle.NormalParticle3(p, position, velocity, radius);
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
      // 乱数を加えた場合
      // const customNumberY = p.random(-2.0, 2.0);

      // ノイズを加えた場合
      // const customNumberY = p.noise(-2.0, 2.0) * 2.0;

      // 三角関数 cos or sinを加えた場合
      //const customNumberY = p.sin(p.frameCount * 0.5) * 20;

      // 重力を加えた場合 -> 中断　要NatureOfCodeの復習
      // const customNumberX = p.cos(p.frameCount * 0.5);
      // const customNumberY = 0.15;
      particle[count].updateParticleCustom();
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
