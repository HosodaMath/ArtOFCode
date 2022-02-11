import P5 from "p5";
import { ParticleTextSystem } from "../particle/ParticlesTextSystem";
/**
 * 
 * @param p 
 * @param mainShader 
 * @param particleTextSystem 
 */
export const cyberSpace = (
  p: P5,
  mainShader: P5.Shader,
  particleTextSystem: ParticleTextSystem
) => {
  const uTime = p.frameCount * 0.05;
  p.push();
  p.translate(-p.width * 0.5, -p.height * 0.5);
  p.shader(mainShader);
  mainShader.setUniform("uResolution", [p.width, p.height]);
  mainShader.setUniform("uTime", uTime);
  p.rect(0, 0, p.width, p.height);
  p.resetShader();
  p.pop();

  particleTextSystem.update();
  particleTextSystem.draw();
};
