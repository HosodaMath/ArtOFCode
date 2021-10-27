import * as P5 from "p5";
import waterTextureVertexShader from "./waterTextureImage.vert";
import waterTextureFragmentShader from "./waterTextureImage.frag";

export const waterTextureImageShader = (p: P5) => {
  1;
  const waterTexture = p.createShader(
    waterTextureVertexShader,
    waterTextureFragmentShader
  );

  return waterTexture;
};

export const waterTextureImageCanvasShader = (canvas: P5.Graphics) => {
  const waterTexture = canvas.createShader(
    waterTextureVertexShader,
    waterTextureFragmentShader
  );

  return waterTexture;
};
