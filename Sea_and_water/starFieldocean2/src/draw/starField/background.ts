import * as P5 from "p5";
import * as Particle from "../particle/particle";

/**
 *
 * @param canvas
 * @param backgroundTexture
 */
export const backgroundTexture = (
  backgroundTexture: P5.Graphics,
  particleParameter: Particle.MiniParticleTextureParameter
) => {
  const canvas = backgroundTexture.drawingContext.canvas.getContext("2d");
  if (!(canvas instanceof CanvasRenderingContext2D)) {
    throw new Error("Error");
  }
  const Origin = 0;
  const width = backgroundTexture.width;
  const width2 = width / 2.0;
  const height = backgroundTexture.height;

  const gradation = canvas.createLinearGradient(width2, Origin, width2, height);
  gradation.addColorStop(0.0, "#000080ff");
  gradation.addColorStop(0.5, "#330080ff");
  gradation.addColorStop(1.0, "#442178ff");

  canvas.fillStyle = gradation;
  canvas.rect(0, 0, width, height);
  canvas.fill();

  const particle = new Particle.MiniParticleTexture(particleParameter);
  particle.updateParticle();
  particle.filterParticle();
  particle.drawParticle(backgroundTexture.color("#ffffff"));
};
