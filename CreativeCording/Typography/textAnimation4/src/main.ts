import { Vector2 } from "./mathematics/vector";
import { Mathematics } from "./mathematics/mathematics";
import { Transform } from "./mathematics/matrix";
import { Rectangle } from "./geomety/rectangle";
import { TransformText } from "./geomety/text";

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

//basic set text
let text_location_data1: Vector2[] = [];
let text_velocity_data1: Vector2[] = [];
let text_data: string[] = [];
let text_font_data: string[] = [];
let text_align_data: CanvasTextAlign[] = [];
let text_fill_color_data: string[] = [];

let time = 0;

const init = () => {
  canvas.width = width = window.innerWidth;
  canvas.height = height = window.innerHeight;

  setText();
};

const setText = () => {
  /// set text data
  const TEXT_LOCATION_X1 = [width * 0.5, width * 0.5, width * 0.5];
  const TEXT_LOCATION_Y1 = [height * 0.25, height * 0.5, height * 0.75];

  const TEXT_VELOCITY_X1 = [0.1, 0.1, 0.1];
  const TEXT_VELOCITY_Y1 = [0.0, 0.0, 0.0];

  const TEXT_DATA = ["Hello World", "Hello World", "Hello World"];
  const TEXT_FONT = ["60px fantasy", "60px fantasy", "60px fantasy"];
  const TEXT_ALIGN: CanvasTextAlign[] = ["right", "center", "left"];
  const TEXT_FILL_COLOR = ["#FFFFFF", "#FFFFFF", "#FFFFFF"];

  [...Array(TEXT_LOCATION_X1.length).keys()].forEach((count) => {
    text_location_data1[count] = new Vector2(
      TEXT_LOCATION_X1[count],
      TEXT_LOCATION_Y1[count]
    );

    text_velocity_data1[count] = new Vector2(
      TEXT_VELOCITY_X1[count],
      TEXT_VELOCITY_Y1[count]
    );

    text_data[count] = TEXT_DATA[count];

    text_font_data[count] = TEXT_FONT[count];

    text_align_data[count] = TEXT_ALIGN[count];

    text_fill_color_data[count] = TEXT_FILL_COLOR[count];
  });
};

const background = (canvas_size: Vector2) => {
  const CANVAS_SIZE = canvas_size;
  const START = new Vector2(0, 0);
  let rect = new Rectangle(gl, START, CANVAS_SIZE);
  rect.draw_fill("#BECDD7");
};

const renderText = (canvas_size: Vector2) => {
  /// text1
  time += 0.05;
  let traslate_data = new Vector2(0, 0);
  let rotate_data = new  Vector2(0, 0);
  let scale_data = new Vector2(Math.cos(time * 0.5), Math.sin(time * 0.3));
  let transform_data: Transform = new Transform(scale_data, rotate_data, traslate_data);
  const MAX = text_location_data1.length;
  [...Array(MAX).keys()].forEach((count) => {
    let fill_text: TransformText = new TransformText(
      gl,
      text_location_data1[count],
      text_velocity_data1[count],
      text_data[count],
      text_font_data[count]
    );

    fill_text.text_step_loop(canvas_size)
    fill_text.drawFillT(text_fill_color_data[count], text_align_data[count], transform_data);
  });
};

const main = () => {
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  //const WIDTH2 = WIDTH / 2.0;
  //const HEIGHT2 = HEIGHT / 2.0;
  const CANVAS_SIZE = new Vector2(WIDTH, HEIGHT);

  background(CANVAS_SIZE);

  renderText(CANVAS_SIZE);

  requestAnimationFrame(main);
};
init();

window.onload = main;
