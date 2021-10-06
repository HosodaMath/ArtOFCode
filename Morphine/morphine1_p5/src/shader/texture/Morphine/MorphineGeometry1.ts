import * as P5 from "p5";
import morphineVertexShader from "./MorphineGeometry1.vert";
import morphineFragmentShader from "./MorphineGeometry1.frag";

export const morphineShader = (p: P5) => {
  const morphineTexture = p.createShader(morphineVertexShader, morphineFragmentShader);

  return morphineTexture;
};

export const morphineCanvasShader = (canvas: P5.Graphics) => {
  const morphineTexture = canvas.createShader(morphineVertexShader, morphineFragmentShader);

  return morphineTexture;
};
