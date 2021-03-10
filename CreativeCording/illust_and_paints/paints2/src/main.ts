import { Vector2 } from "./mathematics/vector";
import { Mathematics } from "./mathematics/mathematics";
import { Rectangle } from "./geomety/rectangle";
import { BrushesCircle } from "./paint/paint_tools/paintsBrushes/circleBrushes";
import { BrushesFlower } from "./paint/paint_tools/paintsBrushes/flowerBrushes";

const canvas = document.querySelector("canvas");

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("not found canvas element");
}

const gl = canvas.getContext("2d")!;
if (!gl) {
  throw new Error("canvasの初期化に失敗しました。");
}

const PAINTMAX = 30;
const FLOWERMAX = 20;

let width = 0;
let height = 0;

/// set cirlce paints
let paint_location: Vector2[] = [];
let paint_velocity: Vector2[] = [];
//let paint_size: number[] = [];
let colors: string[] = [];
let paints: BrushesCircle;

/// set flower paints

let flower_paints: BrushesFlower[] = [];
let flower_paints_size: number[] = [];
let angle = new Vector2(0.0, 0.01);
let scale = new Vector2(0.0, 0.05);
let flower_colors: string[] = [];

/// set time
let time: number;

const init = () => {
  canvas.width = width = window.innerWidth;
  canvas.height = height = window.innerHeight;

  time = 0.0;

  setCirclePaint();
  setFlowerPaints();
};

const setCirclePaint = () => {
  const COLORDATA = [
    "rgba(200, 250, 200, 0.1)",
    "rgba(240, 250, 240, 0.1)",
    "rgba(100, 250, 100, 0.1)",
    "rgba(100, 200, 100, 0.1)",
  ];

  [...Array(PAINTMAX).keys()].forEach((count) => {
    paint_location[count] = new Vector2(
      Mathematics.random(width / 4, width - width / 4.0),
      Mathematics.random(height / 4, height - height / 4.0)
    );

    paint_velocity[count] = new Vector2(
      Mathematics.random(-2, 2),
      Mathematics.random(-2, 2)
    );

    //paint_size[count] = Mathematics.random(5, 10);

    let tmp_color_data = Mathematics.floor(
      Mathematics.random(0, COLORDATA.length)
    );
    colors.push(COLORDATA[tmp_color_data]);
  });
};

const setFlowerPaints = () => {
  let flower_paints_location: Vector2;
  let flower_paints_velocity: Vector2;

  const COLORDATA = [
    "rgba(230, 230, 150, 0.2)",
    "rgba(250, 150, 150, 0.2)",
    "rgba(255, 160, 70, 0.2)",
  ];

  [...Array(FLOWERMAX).keys()].forEach((count) => {
    flower_paints_location = new Vector2(
      Mathematics.random(0, width),
      Mathematics.random(0, height)
    );

    flower_paints_velocity = new Vector2(
      Mathematics.random(0, 0),
      Mathematics.random(0, 0)
    );

    flower_paints[count] = new BrushesFlower(
      gl,
      flower_paints_location,
      flower_paints_velocity,
      angle,
      scale
    );

    flower_paints_size[count] = Mathematics.random(10, 30);

    let tmp_color_data = Mathematics.floor(
      Mathematics.random(0, COLORDATA.length)
    );
    flower_colors.push(COLORDATA[tmp_color_data]);
  });
};

const renderPaints = (canvas_size: Vector2) => {
  [...Array(PAINTMAX).keys()].forEach((count) => {
    paints = new BrushesCircle(
      gl,
      paint_location[count],
      Mathematics.random(5, 20),
      paint_velocity[count]
    );

    paints.paint_step(canvas_size);
    paints.paints_draw(colors[count]);
  });
};

const renderFlower = (canvas_size: Vector2) => {
  [...Array(FLOWERMAX).keys()].forEach((count) => {
    flower_paints[count].stepFlower(canvas_size);
    flower_paints[count].drawFlower(
      flower_colors[count],
      flower_paints_size[count]
    );
  });
};

let background = (canvas_size: Vector2) => {
  const CANVAS_SIZE = canvas_size;
  const START = new Vector2(0, 0);
  let rect = new Rectangle(gl, START, CANVAS_SIZE);
  rect.draw_fill("rgb(255, 255, 255, 0.1)");
};

const main = () => {
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  //const WIDTH2 = WIDTH / 2.0;
  //const HEIGHT2 = HEIGHT / 2.0;
  const CANVAS_SIZE = new Vector2(WIDTH, HEIGHT);

  time = time + 0.01;

  if (time < 20) {
    renderPaints(CANVAS_SIZE);
  } else if (time > 20 && time < 50) {
    gl.save();
    background(CANVAS_SIZE);
    gl.restore();
    
    gl.save();
    renderFlower(CANVAS_SIZE);
    gl.restore();
  }
  /*
  gl.save();
  background(CANVAS_SIZE);
  gl.restore();
  renderFlower(CANVAS_SIZE);
  */

  requestAnimationFrame(main);
};
init();

window.onload = main;
