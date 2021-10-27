import * as P5 from "p5";
import RGBSplitVertexShader from "./rgbSplit.vert";
import RGBSplitFragmentShader from "./rgbSplit.frag";

export const rgbSplitShader = (p: P5) => {
  const rgbSplit = p.createShader(RGBSplitVertexShader, RGBSplitFragmentShader);

  return rgbSplit;
};

export const rgbSplitCanvasShader = (canvas: P5.Graphics) => {
  const rgbSplit = canvas.createShader(RGBSplitVertexShader, RGBSplitFragmentShader);

  return rgbSplit;
};
