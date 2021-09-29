import * as P5 from "p5";
import RGBDoublePassBlurVertexShader from "./rgbDoublePassBlur.vert";
import RGBDoublePassBlurFragmentShader from "./rgbDoublePassBlur.frag";

export const rgbDoublePassBlurShader = (p: P5) => {
  const rgbDoublePassBlur = p.createShader(
    RGBDoublePassBlurVertexShader,
    RGBDoublePassBlurFragmentShader
  );

  return rgbDoublePassBlur;
};

export const rgbDoublePassBlurCanvasShader = (canvas: P5.Graphics) => {
  const rgbDoublePassBlur = canvas.createShader(
    RGBDoublePassBlurVertexShader,
    RGBDoublePassBlurFragmentShader
  );

  return rgbDoublePassBlur;
};
