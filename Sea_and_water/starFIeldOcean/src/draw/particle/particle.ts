import * as P5 from "p5";
// import * as Geometry from "../../geometry/geometry";
export interface ParticleParameter {
  p: P5;
  position: P5.Vector;
  size: number;
  velocity: P5.Vector;
}

export class Particle {
  public particle: ParticleParameter;
  constructor(particle: ParticleParameter) {
    this.particle = particle;
  }

  updateParticle = (): void => {
    this.particle.position.sub(this.particle.velocity);
  };

  removeParticle = (): boolean => {
    const remove =
      -this.particle.p.width / 2.0 + 10 <= this.particle.position.y;

    return remove;
  };

  drawParticle = (color: P5.Color, isShader: boolean = false): void => {
    if (isShader === false) {
      const noise = this.particle.p.noise(
        this.particle.position.x * 20.0,
        this.particle.position.y * 20.0
      );
      const shiftX = this.particle.p.map(noise, 0, 1, -15, -15);
      this.particle.p.push();
      this.particle.p.translate(
        this.particle.position.x + shiftX,
        this.particle.position.y,
        0.0
      );
      this.particle.p.fill(color);
      this.particle.p.circle(0, 0, this.particle.size);
      this.particle.p.pop();
    }
  };
}
