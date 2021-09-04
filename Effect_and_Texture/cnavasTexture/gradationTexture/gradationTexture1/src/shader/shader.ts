import P5 from "p5";
import * as Shader from "./exportShader";
export const createShader = (canvas: P5 | P5.Graphics) => {
  const vertexShader = Shader.DoubleBlurVertexShader;
  const fragmentShader = Shader.DoubleBlurFragmentShader;
  const shader = canvas.createShader(vertexShader, fragmentShader);
  return shader;
};

export const createShaderN = (canvas: P5 | P5.Graphics) => {
  const doubleBlurVertexShader = Shader.DoubleBlurVertexShader;
  const doubleBlurFragmentShader = Shader.DoubleBlurFragmentShader;
  const splitVertexShader = Shader.RGBSplitVertexShader;
  const splitFragmentShader = Shader.RGBSplitFragmentShader;
  const shader: P5.Shader[] = [
    canvas.createShader(doubleBlurVertexShader, doubleBlurFragmentShader),
    canvas.createShader(splitVertexShader, splitFragmentShader),
  ];
  return shader;
};
