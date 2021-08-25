import P5 from "p5";
export const createShader = (
  p: P5,
  vertexShader: string,
  fragmentShader: string
) => {
  const shader = p.createShader(vertexShader, fragmentShader);

  return shader;
};
