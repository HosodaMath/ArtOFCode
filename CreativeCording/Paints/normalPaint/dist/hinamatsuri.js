import { Vector2 } from "./mathematics/vector.js";
import { Mathematics } from "./mathematics/mathematics.js";
// import { BrushesCircle } from "./paint/paint_tools/paintsBrushes/circleBrushes.js";
// import { BrushesRectangle } from "./paint/paint_tools/paintsBrushes/rectBrushes.js";
import { BrushesLine } from "./paint/paint_tools/paintsBrushes/lineBrushes.js";
const canvas = document.querySelector("canvas");
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("not found canvas element");
}
const gl = canvas.getContext("2d");
if (!gl) {
    throw new Error("canvasの初期化に失敗しました。");
}
let width = 0;
let height = 0;
let brushes_line_coordinate1;
let brushes_line_velocity1;
let brushes_line_size1;
let brushes_line_coordinate2;
let brushes_line_velocity2;
let brushes_line_size2;
const init = () => {
    canvas.width = width = window.innerWidth;
    canvas.height = height = window.innerHeight;
    brushes_line_coordinate1 = new Vector2(Mathematics.random(0, width), Mathematics.random(0, height));
    brushes_line_velocity1 = new Vector2(Mathematics.random(-2, 2), Mathematics.random(-1, 1));
    brushes_line_size1 = new Vector2(Mathematics.random(10, 50), Mathematics.random(10, 50));
    brushes_line_coordinate2 = new Vector2(Mathematics.random(0, width / 2.0), Mathematics.random(0, height / 2.0));
    brushes_line_velocity2 = new Vector2(Mathematics.random(-2, 2), Mathematics.random(-1, 1));
    brushes_line_size2 = new Vector2(Mathematics.random(10, 20), Mathematics.random(10, 20));
};
const paints = (canvas_size) => {
    let brushes1 = new BrushesLine(gl, brushes_line_coordinate1, brushes_line_size1, brushes_line_velocity1);
    brushes1.paint_step(canvas_size);
    brushes1.paints_draw("rgba(255, 240, 245, 0.1)");
    let brushes2 = new BrushesLine(gl, brushes_line_coordinate2, brushes_line_size2, brushes_line_velocity2);
    brushes2.paint_step(canvas_size);
    brushes2.paints_draw("rgba(175, 238, 238, 0.1)");
};
const main = () => {
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    //const WIDTH2 = WIDTH / 2.0;
    //const HEIGHT2 = HEIGHT / 2.0;
    const WINDOW_SIZE = new Vector2(WIDTH, HEIGHT);
    paints(WINDOW_SIZE);
    requestAnimationFrame(main);
};
init();
window.onload = main;
