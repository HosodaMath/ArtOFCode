import { Mathematics } from "./mathematics.js";
import { Vector2 } from "./vector.js";
import { Rectangle } from "./paintsBrushes/rectangle.js"
import { Flower } from "./paintsBrushes/flower.js"
const canvas = document.querySelector("canvas");

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("not found canvas element");
}

const gl = canvas.getContext("2d")!;
if (!gl) {
  throw new Error("canvasの初期化に失敗しました。");
}

let location1: Vector2[] = [];
let velocity1: Vector2[] = [];
let location2: Vector2[] = [];
let velocity2: Vector2[] = [];
let width = 0;
let height = 0;
let rect_color_data: string[] = [];
let flower_color_data: string[] = [];
let flower_radius: number[] = [];
let flower_type: number[] = [];
let time = 0;

const setup = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;
  //let width2 = canvas.width / 2;
  //let height2 = canvas.height / 2;
  const SHIFT_X1 = 50;
  const SHIFT_y1 = SHIFT_X1;
  for (let count = 0; count < 20; count++) {
    /// ブラシの座標設定
    location1[count] = new Vector2(
      Mathematics.random(width / 4, width - width / 4 - SHIFT_X1),
      Mathematics.random(height / 4, height - height / 4 - SHIFT_y1));
    velocity1[count] = new Vector2(
      Mathematics.random(-2, 2),
      Mathematics.random(-2, 2)
    );
    
    const SHIFT_X2 = 20;
    const SHIFT_y2 = SHIFT_X2;
    location2[count] = new Vector2(
      Mathematics.random(width / 4 + SHIFT_X2, width - width / 4 - SHIFT_X2),
      Mathematics.random(height / 4 + SHIFT_y2, height - height / 4 - SHIFT_y2));
    velocity2[count] = new Vector2(0, 0);

    /// 背景色
    let red1 = Mathematics.random(100, 150);
    let green1 = Mathematics.random(100, 150);
    let blue1 = Mathematics.random(200, 255);
    rect_color_data.push(`rgba(${red1}, ${green1}, ${blue1}, 0.1)`);

    /// メインカラー
    let red2 = Mathematics.random(200, 255);
    let green2 = Mathematics.random(100, 255);
    let blue2 = Mathematics.random(20, 60);
    flower_color_data.push(`rgba(${red2}, ${green2}, ${blue2}, 0.2)`);
    
    /// 花の大きさ
    flower_radius[count] = Mathematics.random(10, 20);

    /// 花の形
    flower_type[count] = Mathematics.random(4, 8);
  }

}


const background = () => {
  for (let count = 0; count < location1.length; count++) {
    let circle = new Rectangle(gl, location1[count], velocity1[count]);
    circle.stepRect(width, height);
    circle.renderRect(rect_color_data[count]);
  }
}

const renderFlower = () => {
  for (let count = 0; count < location2.length; count++) {
    let flower = new Flower(gl, location2[count], velocity2[count]);
    flower.stepFlower(width, height);
    flower.drawFlower(
      flower_color_data[count], flower_radius[count], flower_type[count]
    );
  }
}

const renderFrame = () => {
  let width4 = width / 4;
  let height4 = height / 4;
  gl.beginPath();
  gl.strokeStyle = "#794800";
  gl.lineWidth = 10;
  gl.moveTo(width4, height - height4);
  gl.lineTo(width4, height4);
  gl.lineTo(width - width4, height4);
  gl.lineTo(width - width4, height - height4);
  gl.closePath();
  gl.stroke();
}

const main = () => {
  time = time + 0.01;
  console.log(time);
  if (time > 0 && time < 30) {
    background();
    //renderFrame();
    console.log("timeline1");
  } else if (time > 30 && time < 35) {
    renderFlower();
    console.log("timeline2");
  } else if (time > 35 && time < 40) {
    renderFrame();
    console.log("timeline3");
  }

  requestAnimationFrame(main);

}
setup();

window.onload = main;