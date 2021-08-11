import * as P5 from "p5";
import * as GLMath from "../../math/GLMath";
import rgbSplitVertexShader from "../rgbSplit/rgb_split.vert";
import rgbSplitFragmentShader from "../rgbSplit/rgb_split.frag";
/**
 * 
 * @param p 
 * @returns 
 */
export const initRGBSplit = (p: P5) => {
  const shader = p.createShader(rgbSplitVertexShader, rgbSplitFragmentShader);

  return shader;
};

/**
 * 
 * @param p 
 * @param image 
 * @param shader 
 */
export const drawRGBSplit = (p: P5, image: P5.Image, shader: P5.Shader) => {
  const planeSize = new GLMath.Vector2(800, 800);
  p.shader(shader);
  shader.setUniform("uTexture", image);
  shader.setUniform("resolution", [p.width, p.height]);
  shader.setUniform("time", p.frameCount * 0.05);

  p.plane(planeSize.x, planeSize.y, 200, 200);
  p.resetShader();
};
