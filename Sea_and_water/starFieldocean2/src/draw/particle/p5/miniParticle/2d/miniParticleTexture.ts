import * as P5 from "p5";
export interface MiniParticleTextureParameter {
  canvas: P5.Graphics;
  position: P5.Vector[];
  velocity: P5.Vector[];
  size: number[];
}

/**
 * @class CanvasParticle
 */
export class MiniParticleTexture {
  public particle: MiniParticleTextureParameter;
  /**
   *
   * @param particle
   */
  constructor(particle: MiniParticleTextureParameter) {
    this.particle = particle;
  }

  updateParticle = (): void => {
    [...Array(this.particle.position.length).keys()].forEach((count) => {
      this.particle.position[count].sub(this.particle.velocity[count]);
    });
  };

  filterParticle = () => {
    [...Array(this.particle.position.length).keys()].forEach((count) => {
      if (this.particle.position[count].y < 0) {
        this.particle.position[count].x = this.particle.canvas.random(
          0,
          this.particle.canvas.width
        );

        this.particle.position[count].y = this.particle.canvas.height + 10;
      }
    });
  };

  drawParticle = (color: P5.Color): void => {
    this.particle.canvas.push();
    [...Array(this.particle.position.length).keys()].forEach((count) => {
      this.particle.canvas.push();
      const shiftX = this.particle.canvas.random(-0.01, 0.01);
      const shiftY = this.particle.canvas.random(0.01, 0.05);
      this.particle.canvas.translate(
        this.particle.position[count].x + shiftX,
        this.particle.position[count].y + shiftY
      );
      this.particle.canvas.fill(color);
      this.particle.canvas.circle(0, 0, this.particle.size[count]);
      this.particle.canvas.pop();
    });
    this.particle.canvas.pop();
  };
}
