import * as P5 from "p5";
/**
 * 
 * @param p 
 * @param vertexShader 
 * @param fragmentShader 
 * @returns 
 */
export const createShader = (
  p: P5,
  vertexShader: string,
  fragmentShader: string
) => {
  const createShader = p.createShader(vertexShader, fragmentShader);

  return createShader;
};

export const createCanvasShader = (
  canvas: P5.Graphics,
  vertexShader: string,
  fragmentShader: string
) => {
  const createShader = canvas.createShader(vertexShader, fragmentShader);

  return createShader;
};
