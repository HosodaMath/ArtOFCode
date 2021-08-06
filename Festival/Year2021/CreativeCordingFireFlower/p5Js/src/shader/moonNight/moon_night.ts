import * as P5 from "p5";
import * as GLMath from "../../math/GLMath";

import MoonNightVertexShader from "../moonNight/moon_night.vert";
import MoonNightFragmentShader from "../moonNight/moon_night.frag";

/**
 *
 * @param p
 * @returns
 */
export const initMoonNight = (p: P5) => {
  const shader = p.createShader(MoonNightVertexShader, MoonNightFragmentShader);

  return shader;
};

/**
 *
 * @param p
 * @param shader
 * @param flag
 */
export const drawMoonNight = (p: P5, shader: P5.Shader, flag = false) => {
  const planeSize = new GLMath.Vector2(1000, 1000);
  p.shader(shader);
  shader.setUniform("time", p.frameCount * 0.01);
  if (flag === false) {
    p.push();
    p.translate(-p.width / 2.0, -p.height / 2.0, -5.0);
    p.rect(0, 0, p.width, p.height);
    p.pop();
  } else {
    p.push();
    p.translate(-p.width / 2.0, -p.height / 2.0, 5.0);
    p.plane(planeSize.x, planeSize.y, 200, 200);
    p.pop();
  }
  p.resetShader();
};
