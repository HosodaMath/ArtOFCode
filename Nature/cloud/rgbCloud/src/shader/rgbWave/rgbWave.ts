import * as P5 from "p5";
import * as GLMath from "../../math/GLMath";
import rgbWaveVertexShader from "../rgbWave/rgb_wave2.vert";
import rgbWaveFragmentShader from "../rgbWave/rgb_wave2.frag";
/**
 *
 * @param p
 * @returns
 */
export const initRGBWave = (p: P5) => {
  const shader = p.createShader(rgbWaveVertexShader, rgbWaveFragmentShader);

  return shader;
};

/**
 * 
 * @param p 
 * @param image 
 * @param shader 
 * @param flag 
 */
export const drawRGBWave = (
  p: P5,
  image: P5.Image,
  shader: P5.Shader,
  flag = false
) => {
  const planeSize = new GLMath.Vector2(800, 800);
  p.shader(shader);
  shader.setUniform("uTexture", image);
  shader.setUniform("uFrameCount", p.frameCount * 0.05);
  if (flag === false) {
    p.plane(planeSize.x, planeSize.y, 200, 200);
  } else {
    p.sphere(planeSize.x / 2, 200, 200);
  }
  p.resetShader();
};
