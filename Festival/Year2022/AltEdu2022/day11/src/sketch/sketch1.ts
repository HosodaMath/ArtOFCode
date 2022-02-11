import P5 from "p5";
import { ParticleTextSystem } from "../sketch/particle/ParticlesTextSystem";
import { cyberSpace } from "./cyberSpace/cyberSpace";
import kenpixelFont from "../assets/font/kenpixel.ttf";
import raymarchVertexShader from "../shader/raymarch/raymarch.vert?raw";
import raymarchFragmentShader from "../shader/raymarch/raymarch.frag?raw";
export const sketch1 = (p: P5) => {
  let font: P5.Font;
  let mainShader: P5.Shader;
  let particleTextSystem: ParticleTextSystem;
  p.preload = () => {
    font = p.loadFont(kenpixelFont);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    p.pixelDensity(1);
    p.textFont(font);
    p.textSize(p.width * 0.05);
    p.textAlign(p.CENTER, p.CENTER);

    mainShader = p.createShader(raymarchVertexShader, raymarchFragmentShader);

    particleTextSystem = new ParticleTextSystem(p);
  };

  p.draw = () => {
    p.background(0, 0, 0);

    cyberSpace(p, mainShader, particleTextSystem);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};
