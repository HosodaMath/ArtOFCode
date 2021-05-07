/**
 * I made a continuous change.
 * It became more interesting when I added continuous changes.
 */
import * as Draw from "./draw";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./main.css";
const canvas = document.querySelector("#canvas");
// canvasのサポートがない場合
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("not found canvas element");
}

const gl = canvas.getContext("2d");
if (!gl) {
  throw new Error("canvasの初期化に失敗しました");
}

let width = 0;
let height = 0;
let time = 0;
let paint_position: Draw.Vector2[] = [];
let paint_velocity: Draw.Vector2[] = [];
const paintColors: string[] = [];
const init = () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  setPaint();
};

const setPaint = () => {
  const COLOR_PALLET = [
    "rgba(200, 250, 200, 0.2)",
    "rgba(200, 200, 250, 0.2)",
    "rgba(150, 250, 250, 0.1)",
    "rgba(200, 250, 250, 0.1)",
  ];

  [...Array(40).keys()].forEach((_count) => {
    const initPostion = new Draw.Vector2(
      Draw.Random.random(0, width),
      Draw.Random.random(0, height)
    );
    paint_position.push(initPostion);

    const initVelocity = new Draw.Vector2(
      Draw.Random.random(-2, 2),
      Draw.Random.random(-2, -2)
    );
    paint_velocity.push(initVelocity);

    const initColors = Math.floor(Draw.Random.random(0, COLOR_PALLET.length));
    paintColors.push(COLOR_PALLET[initColors]);
  });
};

const background = (canvasSize: Draw.Vector2) => {
  const origin = new Draw.Vector2(0, 0);
  const rect = new Draw.Rectangle(gl, origin, canvasSize);
  rect.draw_fill("rgba(0, 0, 30, 0.2)");
};

const renderNormalPaint = (canvasSize: Draw.Vector2) => {
  const paint = new Draw.RandomPaints(
    gl,
    paint_position,
    paint_velocity,
    Draw.Random.random(3, 10)
  );

  paint.drawStep(canvasSize);
  paint.drawCirclePaint(paintColors);
};

const renderMaskPaint = (canvasSize: Draw.Vector2) => {
  const paint = new Draw.RandomPaints(
    gl,
    paint_position,
    paint_velocity,
    Draw.Random.random(3, 10)
  );

  paint.drawStep(canvasSize);
  paint.drawCirclePaint(paintColors);
};

const renderBlurPaint = (canvasSize: Draw.Vector2) => {
  const paint = new Draw.RandomPaints(
    gl,
    paint_position,
    paint_velocity,
    Draw.Random.random(3, 10)
  );

  paint.drawStep(canvasSize);
  paint.drawCirclePaint(paintColors);
};

const main = () => {
  time += 0.1;
  if (time > 0 && time < 20) {
    const canvasSize = new Draw.Vector2(width, height);
    renderNormalPaint(canvasSize);
  } else if (time > 20 && time < 40) {
    const canvasSize1 = new Draw.Vector2(width / 2.0, height);
    background(canvasSize1);
    const canvasSize2 = new Draw.Vector2(width, height);
    renderMaskPaint(canvasSize2);
  } else if (time > 40 && time < 60) {
    const canvasSize = new Draw.Vector2(width, height);
    background(canvasSize);
    renderBlurPaint(canvasSize);
  } else {
    const canvasSize = new Draw.Vector2(width, height);
    renderNormalPaint(canvasSize);
  }

  requestAnimationFrame(main);
};

init();
window.onload = main;
