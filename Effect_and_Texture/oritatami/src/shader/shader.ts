import P5 from "p5";
import * as Shader from "./exportShader";
export const createShader = (p: P5) => {
  const vertexShader = Shader.OritatamiVertexShader;
  const fragmentShader = Shader.OritatamiFragmentShader;
  const shader = p.createShader(vertexShader, fragmentShader);
  return shader;
};
