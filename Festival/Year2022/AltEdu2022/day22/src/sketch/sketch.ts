import * as P5 from "p5";
import * as Eases from "eases";
import {
  createBlueAirTexture,
  createNightAirTexture,
  createStarParticleTexture,
} from "./texture/texture";
import { Star } from "../geometry/geometry";
export const sketch = () => {
  const mainSketch = (p: P5) => {
    let blueAirTexture: P5.Graphics;
    let nightAirTexture: P5.Graphics;
    let starPaticleTexture: P5.Graphics;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.noStroke();
      p.pixelDensity(1);
      p.textureMode(p.NORMAL);

      // Mainの星に貼り付ける青空テクスチャの作成
      blueAirTexture = createBlueAirTexture(p);

      // 背景に割り当てるテクスチャ
      const backgroundTextureSize: [number, number] = [p.width, p.height];
      const backgroundTexture = createNightAirTexture(p, backgroundTextureSize);

      // 背景の星に割り当てるテクスチャ
      const nightAirTextureSize: [number, number] = [512, 512];
      const starTexture = createNightAirTexture(p, nightAirTextureSize);

      // StarParticleの作成
      // 青空テクスチャの作成を使用
      const textureSize: [number, number] = [p.width, p.height];
      const texture = starTexture;
      const rangeMax = 100;
      const rangeX: [number, number] = [-p.width * 0.5, p.width * 0.5];
      const rangeY: [number, number] = [-p.height * 0.5, p.height * 0.5];
      const starSize = p.height * 0.025;
      starPaticleTexture = createStarParticleTexture(
        p,
        textureSize,
        backgroundTexture,
        texture,
        rangeMax,
        rangeX,
        rangeY,
        starSize
      );
    };

    p.draw = () => {
      p.background(0, 0, 0);

      p.push();
      p.translate(-p.width * 0.5, -p.height * 0.5, 0);
      p.image(starPaticleTexture, 0, 0);
      p.pop();

      const moveX = p.width * 0.5;
      const progress = p.cos(p.frameCount * 0.005);
      const deltaX = moveX * Eases.cubicInOut(progress);
      p.push();
      p.translate(deltaX, 0, 0);
      Star.starTexture({
        p: p,
        size: p.height * 0.1,
        pricleNumber: 5,
        segmentNumber: 5,
        texture: blueAirTexture,
      });
      p.pop();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);

      // Mainの星に貼り付ける青空テクスチャの作成
      blueAirTexture = createBlueAirTexture(p);

      // 背景に割り当てるテクスチャ
      const backgroundTextureSize: [number, number] = [p.width, p.height];
      const backgroundTexture = createNightAirTexture(p, backgroundTextureSize);

      // 背景の星に割り当てるテクスチャ
      const nightAirTextureSize: [number, number] = [512, 512];
      const starTexture = createNightAirTexture(p, nightAirTextureSize);

      // StarParticleの作成
      // 青空テクスチャの作成を使用
      const textureSize: [number, number] = [p.width, p.height];
      const texture = starTexture;
      const rangeMax = 100;
      const rangeX: [number, number] = [-p.width * 0.5, p.width * 0.5];
      const rangeY: [number, number] = [-p.height * 0.5, p.height * 0.5];
      const starSize = p.height * 0.025;
      starPaticleTexture = createStarParticleTexture(
        p,
        textureSize,
        backgroundTexture,
        texture,
        rangeMax,
        rangeX,
        rangeY,
        starSize
      );
    };
  };

  new P5(mainSketch);
};
