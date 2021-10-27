import * as P5 from "p5";
import yuragiVertexShader from "./yuragi.vert";
import yuragiFragmentShader from "./yuragi.frag";

export const yuragiShader = (p: P5) => {
  const yuragiTexture = p.createShader(yuragiVertexShader, yuragiFragmentShader);

  return yuragiTexture;
};

export const yuragiCanvasShader = (canvas: P5.Graphics) => {
  const yuragiTexture = canvas.createShader(yuragiVertexShader, yuragiFragmentShader);

  return yuragiTexture;
};
