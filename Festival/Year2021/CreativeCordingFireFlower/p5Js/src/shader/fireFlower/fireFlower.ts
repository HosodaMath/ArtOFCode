import * as P5 from "p5";
import fireFlowerVertexShader from "../fireFlower/fireFlower.vert";
import fireFlowerFragmentShader from "../fireFlower/fireFlower.frag";

/**
 *
 * @param p
 * @returns
 */
export const initFireFlowerShader = (p: P5) => {
  const shader = p.createShader(
    fireFlowerVertexShader,
    fireFlowerFragmentShader
  );

  return shader;
};
