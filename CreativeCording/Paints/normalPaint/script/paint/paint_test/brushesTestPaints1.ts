import { Vector2 } from "../../mathematics/vector.js";
import { Mathematics } from "../../mathematics/mathematics.js";
import { BrushesCircle } from "../paint_tools/paintsBrushes/circleBrushes.js";

const canvas = document.querySelector("canvas");

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("not found canvas element");
}

const gl = canvas.getContext("2d")!;
if (!gl) {
  throw new Error("canvasの初期化に失敗しました。");
}

let width = 0;
let height = 0;
let brushes_circle_coordinate1: Vector2;
let brushes_circle_velocity1: Vector2;
let brushes_circle_size: number;
const init = () => {
  canvas.width = width = window.innerWidth;
  canvas.height = height = window.innerHeight;

  brushes_circle_coordinate1 = new Vector2(Mathematics.random(0, width), Mathematics.random(0, height));
  brushes_circle_velocity1 = new Vector2(Mathematics.random(-2, 2), Mathematics.random(-1, 1));
  brushes_circle_size = Mathematics.random(2, 10);

  //console.log(brushes_circle_coordinate1);
}

const paints = (canvas_size: Vector2) => {

  let brushes = new BrushesCircle(gl, 
    brushes_circle_coordinate1, brushes_circle_size, 
    brushes_circle_velocity1
  )

  brushes.paint_step(canvas_size);
  brushes.paints_draw("rgba(255, 240, 245, 0.1)");

}

const main = () => {
  
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  //const WIDTH2 = WIDTH / 2.0;
  //const HEIGHT2 = HEIGHT / 2.0;
  const WINDOW_SIZE = new Vector2(WIDTH, HEIGHT);

  paints(WINDOW_SIZE);

  requestAnimationFrame(main);
}
init();

window.onload = main;