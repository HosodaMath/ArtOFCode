import * as P5 from "p5";
export interface CanvasParticleParameter {
  canvas: P5.Graphics;
  position: P5.Vector;
  size: number;
  velocity: P5.Vector;
}

export class CanvasParticle {
  public particle: CanvasParticleParameter;
  constructor(particle: CanvasParticleParameter) {
    this.particle = particle;
  }

  updateParticle = (): void => {
    this.particle.position.sub(this.particle.velocity);
  };

  removeParticle = (): boolean => {
    const remove = -this.particle.canvas.width / 2.0 + 10 <= this.particle.position.y;

    return remove;
  };

  drawParticle = (color: P5.Color, isShader: boolean = false): void => {
    if (isShader === false) {
      this.particle.canvas.push();
      this.particle.canvas.translate(
        this.particle.position.x,
        this.particle.position.y,
        0.0
      );
      this.particle.canvas.fill(color);
      this.particle.canvas.circle(0, 0, this.particle.size);
      this.particle.canvas.pop();
    }
  };
}
