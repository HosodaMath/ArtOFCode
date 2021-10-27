import * as P5 from "p5";
import waterTextureVertexShader from "./waterTextureStar.vert";
import waterTextureFragmentShader from "./waterTextureStar.frag";

export const waterTextureStarShader = (p: P5) => {
  const waterTexture = p.createShader(
    waterTextureVertexShader,
    waterTextureFragmentShader
  );

  return waterTexture;
};

export const waterTextureStarCanvasShader = (canvas: P5.Graphics) => {
  const waterTexture = canvas.createShader(
    waterTextureVertexShader,
    waterTextureFragmentShader
  );

  return waterTexture;
};
