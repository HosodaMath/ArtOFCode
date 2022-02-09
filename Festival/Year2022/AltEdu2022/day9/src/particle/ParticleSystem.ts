import P5 from "p5";
import { Particle } from "./Particle";
export class ParticleSystem {
  private p: P5;
  private texture: P5.Image;
  private particles: Particle[];
  constructor(p: P5, texture: P5.Image) {
    this.p = p;
    this.texture = texture;
    this.particles = [];
  }

  private addParticle() {
    const position = this.p.createVector(
      this.p.random(0, this.p.width),
      this.p.height - 100
    );
    const velocityX = this.p.randomGaussian() * 0.3;
    const velocityY = this.p.randomGaussian() * 0.3 - 1.0;
    const velocity = this.p.createVector(velocityX, velocityY);

    const particle = new Particle(this.p, position, velocity, this.texture);

    this.particles.push(particle);
  }

  public update(windX: number) {
    if (this.p.frameCount % 12 === 1) {
      this.addParticle();
    }

    const wind = this.p.createVector(windX, 0);
    for (const particle of this.particles) {
      particle.applyForce(wind);
      particle.update();
    }

    this.particles = this.particles.filter((p) => p.isRemove());
  }

  draw() {
    // console.log(this.particles.length);
    for (const particle of this.particles) {
      particle.draw();
    }
  }
}
