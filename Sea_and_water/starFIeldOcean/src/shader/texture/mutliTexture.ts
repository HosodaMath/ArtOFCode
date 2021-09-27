import * as P5 from "p5";
import mutliTextureVertexShader from "./mutliTexture.vert";
import mutliTextureFragmentShader from "./mutliTexture.frag";

export const mutliTextureShader = (p: P5) => {
  const noiseTexture = p.createShader(mutliTextureVertexShader, mutliTextureFragmentShader);

  return noiseTexture;
};

export const mutliTextureCanvasShader = (canvas: P5.Graphics) => {
  const noiseTexture = canvas.createShader(mutliTextureVertexShader, mutliTextureFragmentShader);

  return noiseTexture;
};
