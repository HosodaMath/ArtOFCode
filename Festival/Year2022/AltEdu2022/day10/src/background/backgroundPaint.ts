import P5 from "p5";
/**
 * 
 * @param p 
 * @param mainShader 
 */
export const backgroundPaint = (p: P5, mainShader: P5.Shader) => {
  p.push();
  p.translate(-p.width * 0.5, -p.height * 0.5);
  p.shader(mainShader);
  mainShader.setUniform("uResolution", [p.width, p.height]);
  mainShader.setUniform("uTime", 0.5);
  p.rect(0, 0, p.width, p.height);
  p.resetShader();
  p.pop();
};
