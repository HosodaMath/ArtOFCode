import * as P5 from "p5";
import { StarTexture } from "../../../geometry/geometry";
/**
 * 
 * @param p p5 incetance
 * @param textureSize 作成するテクスチャの大きさ
 * @param texture 星に貼り付けるテクスチャ
 * @param generateMax 生成個数の最大値
 * @param generateRangeX x座標の生成範囲
 * @param generateRangeY y座標の生成範囲
 * @param starSize 星の大きさ
 * @returns 
 */
export const createStarParticleTexture = (
  p: P5,
  textureSize: [number, number],
  backgroundTexture: P5.Graphics | P5.Image | undefined,
  texture: P5.Graphics | P5.Image,
  generateMax: number,
  generateRangeX: [number, number],
  generateRangeY: [number, number],
  starSize: number
): P5.Graphics => {
  const pricleNumber = 5;
  const segmentNumber = 5;
  const canvas = p.createGraphics(textureSize[0], textureSize[1], p.WEBGL);
  canvas.textureMode(canvas.NORMAL);
  if(typeof backgroundTexture === undefined){
    canvas.background(p.color(0, 0, 30));
  }

  canvas.push();
  canvas.translate(-canvas.width * 0.5, -canvas.height * 0.5);
  canvas.image(backgroundTexture, 0, 0);
  canvas.pop();

  canvas.push();
  [...Array(generateMax).keys()].forEach((count) => {
    canvas.push();
    const positionX = canvas.random(generateRangeX[0], generateRangeX[1]);
    const positionY = canvas.random(generateRangeY[0], generateRangeY[1]);
    canvas.translate(positionX, positionY, 0.0);
    StarTexture.starTexture({
      canvas: canvas,
      size: starSize,
      pricleNumber: pricleNumber,
      segmentNumber: segmentNumber,
      texture: texture
    })
    canvas.pop();
  });
  canvas.pop();

  return canvas;
};
