import * as P5 from "p5";
import noiseTextureVertexShader from "./noiseTexture.vert";
import noiseTextureFragmentShader from "./noiseTexture.frag";

export const noiseTextureShader = (p: P5) => {
  const noiseTexture = p.createShader(noiseTextureVertexShader, noiseTextureFragmentShader);

  return noiseTexture;
};

export const noiseTextureCanvasShader = (canvas: P5.Graphics) => {
  const noiseTexture = canvas.createShader(noiseTextureVertexShader, noiseTextureFragmentShader);

  return noiseTexture;
};
