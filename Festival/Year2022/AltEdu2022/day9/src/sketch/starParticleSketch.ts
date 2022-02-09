import P5 from "p5";
import { ParticleSystem } from "../particle/ParticleSystem";
import ParticleImage from "../assets/texture/star32.png";
export const starParticleSketch = () => {
  const sketch = (p: P5) => {
    let particleTexture: P5.Image;
    let particleSystem: ParticleSystem;

    p.preload = () => {
      particleTexture = p.loadImage(ParticleImage);
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.noStroke();
      p.pixelDensity(1);

      particleSystem = new ParticleSystem(p, particleTexture);
    };

    p.draw = () => {
      p.background(0, 0, 0);

      const dx = p.map(p.mouseX, 0, p.width, -0.2, 0.2);
      particleSystem.update(dx);
      particleSystem.draw();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };

  new P5(sketch);
};
