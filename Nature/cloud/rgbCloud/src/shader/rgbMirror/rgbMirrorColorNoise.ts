import * as P5 from "p5";
import * as GLMath from "../../math/GLMath";
import rgbMirrorColorNoiseVertexShader from "../rgbMirror/rgb_mirror_color_noise.vert";
import rgbMirrorColorNoiseFragmentShader from "../rgbMirror/rgb_mirror_color_noise.frag";

/**
 *
 * @param p
 * @returns
 */
export const initRGBMirrorColorNoise = (p: P5) => {
  const shader = p.createShader(
    rgbMirrorColorNoiseVertexShader,
    rgbMirrorColorNoiseFragmentShader
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
export const drawRGBMirrorColorNoise = (
  p: P5,
  image: P5.Image,
  shader: P5.Shader,
  flag = false
) => {
  const planeSize = new GLMath.Vector2(1000, 1000);
  p.shader(shader);
  shader.setUniform("uTexture", image);
  if (flag === false) {
    p.push();
    p.translate(-p.width / 2.0, -p.height / 2.0);
    p.rect(0, 0, p.width, p.height);
    p.pop();
  } else {
    p.plane(planeSize.x, planeSize.y, 200, 200);
  }
  p.resetShader();
};
