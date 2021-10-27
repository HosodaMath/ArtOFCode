import * as P5 from "p5";
import waterTextureVertexShader from "./waterTextureSpark.vert";
import waterTextureFragmentShader from "./waterTextureSpark.frag";

export const waterTextureSparkShader = (p: P5) => {
  const waterTexture = p.createShader(waterTextureVertexShader, waterTextureFragmentShader);

  return waterTexture;
};

export const waterTextureSparkCanvasShader = (canvas: P5.Graphics) => {
  const waterTexture = canvas.createShader(waterTextureVertexShader, waterTextureFragmentShader);

  return waterTexture;
};
