import P5 from "p5";
import { Vector3 } from "../../mathematics/Vector3";
import { Particle, DigitalText } from "./Particle";
export class ParticleTextSystem {
  private p: P5;
  private particlesText: Particle[];
  constructor(p: P5) {
    this.p = p;
    this.particlesText = [];
  }

  private addTextParticle() {
    const positionX = this.p.random(-this.p.width * 0.5, this.p.width * 0.5);
    const positionY = -this.p.height * 0.5;
    const positionZ = 0;
    const position = new Vector3(positionX, positionY, positionZ);
    const mass = 1;
    const textData: DigitalText[] = ["0", "1"];
    const textChoice = this.p.floor(this.p.random(0, textData.length));
    const text = textData[textChoice];
    const textParticle = new Particle(this.p, position, mass, text);
    this.particlesText.push(textParticle);
  }

  public update() {
    if (this.p.frameCount % 12 === 1) {
      this.addTextParticle();
    }

    const gravity = new Vector3(0.0, 0.01, 0.0);
    for (const textParticle of this.particlesText) {
      textParticle.applyForce(gravity);
      textParticle.update();
    }

    this.particlesText = this.particlesText.filter((textParticle) =>
      textParticle.isRemove()
    );
  }

  public draw() {
    for (const textParticle of this.particlesText) {
      textParticle.draw();
      textParticle.isCheckEdge();
    }
  }
}
