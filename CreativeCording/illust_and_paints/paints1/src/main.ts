import { Vector2 } from "./mathematics/vector";
import { Mathematics } from "./mathematics/mathematics";
import { BrushesCircle } from "./paint/paint_tools/paintsBrushes/circleBrushes";

const canvas = document.querySelector("canvas");

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("not found canvas element");
}

const gl = canvas.getContext("2d")!;
if (!gl) {
  throw new Error("canvasの初期化に失敗しました。");
}

const PaintsMAX = 10;

let width = 0;
let height = 0;

let paint_location: Vector2[] = [];
let paint_velocity: Vector2[] = [];
let paint_size: number[] = [];
let colors: string[] = [];
let paints: BrushesCircle;

const init = () => {
  canvas.width = width = window.innerWidth;
  canvas.height = height = window.innerHeight;

  setPaint();
};

const setPaint = () => {
  const COLORDATA = [
    "rgba(200, 250, 200, 0.2)",
    "rgba(200, 200, 250, 0.2)",
    "rgba(100, 250, 100, 0.1)",
    "rgba(100, 100, 250, 0.1)",
  ];

  [...Array(PaintsMAX).keys()].forEach((count) => {
    paint_location[count] = new Vector2(
      Mathematics.random(0, width),
      Mathematics.random(0, height)
    );

    paint_velocity[count] = new Vector2(1, 1);

    //paint_size[count] = Mathematics.random(5, 10);

    let tmp_color_data = Mathematics.floor(
      Mathematics.random(0, COLORDATA.length)
    );
    colors.push(COLORDATA[tmp_color_data]);
  });
};

const renderPaints = (canvas_size: Vector2) => {
  [...Array(PaintsMAX).keys()].forEach((count) => {
    paints = new BrushesCircle(
      gl,
      paint_location[count],
      Mathematics.random(5, 10),
      paint_velocity[count]
    );

    paints.paint_step(canvas_size);
    paints.paints_draw(colors[count]);
  });
};

const main = () => {
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  //const WIDTH2 = WIDTH / 2.0;
  //const HEIGHT2 = HEIGHT / 2.0;
  const CANVAS_SIZE = new Vector2(WIDTH, HEIGHT);
  renderPaints(CANVAS_SIZE);

  requestAnimationFrame(main);
};
init();

window.onload = main;
