import * as P5 from "p5";
import * as GLMath from "../../math/GLMath";
import rgbMirrorColorVertexShader from "../rgbMirror/rgb_mirror_color.vert";
import rgbMirrorColorFragmentShader from "../rgbMirror/rgb_mirror_color.frag";

/**
 *
 * @param p
 * @returns
 */
export const initRGBMirrorColor = (p: P5) => {
  const shader = p.createShader(
    rgbMirrorColorVertexShader,
    rgbMirrorColorFragmentShader
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
export const drawRGBMirrorColor = (
  p: P5,
  image: P5.Image,
  shader: P5.Shader,
  flag = false
) => {
  const planeSize = new GLMath.Vector2(800, 800);
  p.shader(shader);
  shader.setUniform("uTexture", image);
  if (flag === false) {
    p.plane(planeSize.x, planeSize.y, 200, 200);
  } else {
    p.sphere(planeSize.x / 2, 200, 200);
  }
  p.resetShader();
};
