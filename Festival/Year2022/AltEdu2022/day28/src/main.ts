/**
 * ランバートグローシェーディング
 * ランバート反射とは
 * 拡散反射を扱う
 *
 * グローシェーディングとは
 *
 */
import { createFullScreen, createStartWindow } from "./window/window";
import { lambertGouraudSketch } from "./sketch/lambertGouraud";
import "sanitize.css";
import "./style.css";

const gameBody = document.body;
const startButton = createStartWindow(gameBody);
createFullScreen(gameBody);
startButton.startButton.addEventListener("click", () => {
  gameBody.removeChild(startButton.startWindow);
  
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const gl = canvas.getContext("webgl2");
  if (!gl) {
    throw new Error("Error!! Does not support WebGL2");
  }

  

  lambertGouraudSketch(canvas, gl);
});
