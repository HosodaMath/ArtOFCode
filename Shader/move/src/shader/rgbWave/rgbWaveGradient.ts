import * as P5 from "p5";
import * as GLMath from "../../math/GLMath";
import rgbWaveGradientVertexShader from "../rgbWave/rgb_wave_gradient.vert";
import rgbWaveGradientFragmentShader from "../rgbWave/rgb_wave_gradient.frag";
/**
 *
 * @param p
 * @returns
 */
export const initRGBWaveGradient = (p: P5) => {
  const shader = p.createShader(
    rgbWaveGradientVertexShader,
    rgbWaveGradientFragmentShader
  );

  return shader;
};

/**
 *
 * @param p
 * @param image
 * @param shader
 * @param flag
 */
export const drawRGBWaveGradient = (
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
