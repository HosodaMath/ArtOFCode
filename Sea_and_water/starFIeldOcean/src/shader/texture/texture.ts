import * as P5 from "p5";
import textureVertexShader from "./texture.vert";
import textureFragmentShader from "./texture.frag";

export const textureShader = (p: P5) => {
  const noiseTexture = p.createShader(textureVertexShader, textureFragmentShader);

  return noiseTexture;
};

export const textureCanvasShader = (canvas: P5.Graphics) => {
  const noiseTexture = canvas.createShader(textureVertexShader, textureFragmentShader);

  return noiseTexture;
};
