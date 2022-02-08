import P5 from "p5";
import { Mathematics } from "../../src/mathematics/Mathematics";
import { sketch } from "../../src/sketch/sketch2";
import { canvasWidth, canvasHeight } from "../../src/constant/constant";
import { createFullScreen } from "../../src/window/window";

const gameBody = document.body;
window.addEventListener("load", () => {
  createFullScreen(gameBody);

  new P5(sketch);

  const canvas = document.querySelector(".p5Canvas");
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Error");
  }

  let canvasHarfSizeX = canvasWidth * 0.5;
  let canvasHarfSizeY = canvasHeight * 0.5;
  let frameCount: number = 0;
  const canvasAnimation = () => {
    const x = Math.abs(Math.cos(frameCount * 0.005) * window.innerWidth);
    const y = window.innerHeight * 0.5 - canvasHarfSizeY;
    const angle = Mathematics.degTorad(frameCount * 0.5);
    canvas.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;

    frameCount = requestAnimationFrame(canvasAnimation);
  };

  canvasAnimation();
});
