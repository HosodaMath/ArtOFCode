import * as P5 from "p5";
import RGBBloomVertexShader from "./rgbBloom.vert";
import RGBBloomFragmentShader from "./rgbBloom.frag";

export const rgbBloomShader = (p: P5) => {
  const rgbBloom = p.createShader(RGBBloomVertexShader, RGBBloomFragmentShader);

  return rgbBloom;
};

export const rgbBloomCanvasShader = (canvas: P5.Graphics) => {
  const rgbBloom = canvas.createShader(
    RGBBloomVertexShader,
    RGBBloomFragmentShader
  );

  return rgbBloom;
};
