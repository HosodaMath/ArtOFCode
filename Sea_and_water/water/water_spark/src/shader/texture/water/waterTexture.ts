import * as P5 from "p5";
import waterTextureVertexShader from "./waterTexture.vert";
import waterTextureFragmentShader from "./waterTexture.frag";

export const waterTextureShader = (p: P5) => {
  const waterTexture = p.createShader(waterTextureVertexShader, waterTextureFragmentShader);

  return waterTexture;
};

export const waterTextureCanvasShader = (canvas: P5.Graphics) => {
  const waterTexture = canvas.createShader(waterTextureVertexShader, waterTextureFragmentShader);

  return waterTexture;
};
