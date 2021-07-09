import { Mathematics } from "./mathematics.js";
import { Vector2 } from "./vector.js";
import { Polygon } from "./polygon.js";
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
let circle_color_data: string[] = [];
let flower_color_data: string[] = [];

const setup = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;
  //let width2 = canvas.width / 2;
  //let height2 = canvas.height / 2;
  for (let count = 0; count < 20; count++) {
    /// ブラシの座標設定
    location1[count] = new Vector2(
      Mathematics.random(width / 4, width - width / 4),
      Mathematics.random(height / 4, height - height / 4));
    velocity1[count] = new Vector2(
      Mathematics.random(-3, 3),
      Mathematics.random(-3, 3)
    );

    location2[count] = new Vector2(
      Mathematics.random(width / 4, width - width / 4),
      Mathematics.random(height / 4, height - height / 4));
    velocity2[count] = new Vector2(
      Mathematics.random(-1, 1),
      Mathematics.random(-1, 1)
    );

    /// 背景色
    let red1 = Mathematics.random(100, 160);
    let green1 = Mathematics.random(170, 255);
    let blue1 = Mathematics.random(100, 160);
    circle_color_data.push(`rgba(${red1}, ${green1}, ${blue1}, 0.2)`);

    /// メインカラー
    let red2 = Mathematics.random(200, 255);
    let green2 = Mathematics.random(200, 255);
    let blue2 = Mathematics.random(20, 60);
    flower_color_data.push(`rgba(${red2}, ${green2}, ${blue2}, 0.7)`);
  }

}

// paints  brushes
class Circle {
  private location1 = new Vector2(0, 0);
  private velocity1 = new Vector2(0, 0);
  constructor(location1: Vector2, velocity1: Vector2) {
    this.location1 = location1;
    this.velocity1 = velocity1;
  }

  public stepCircle = () => {
    this.location1.add(this.velocity1);

    if (this.location1.coord_x < 0 || this.location1.coord_x > width) {
      this.velocity1.x *= -1;
    }

    if (this.location1.coord_y < 0 || this.location1.coord_y > height) {
      this.velocity1.y *= -1;
    }
  }

  public renderCircle = (fill_color: string) => {
    gl.beginPath();
    gl.fillStyle = fill_color;
    gl.arc(this.location1.x, this.location1.y, Mathematics.random(50, 70), 0, Math.PI);
    gl.closePath();
    gl.fill();
  }
}

class Flower {
  private location1 = new Vector2(0, 0);
  private velocity1 = new Vector2(0, 0);
  constructor(location1: Vector2, velocity1: Vector2) {
    this.location1 = location1;
    this.velocity1 = velocity1;
  }

  public stepFlower = () => {
    this.location1.add(this.velocity1);

    if (this.location1.coord_x < 0 || this.location1.coord_x > width) {
      this.velocity1.x *= -1;
    }

    if (this.location1.coord_y < 0 || this.location1.coord_y > height) {
      this.velocity1.y *= -1;
    }
  }

  public drawFlower = (fill_color: string, radius = 20, k: number = 4) => {
    let tmp_data: Vector2[] = [];
    for (let count = 0; count < Math.PI * 4; count += 0.01) {
      let x = Math.cos(k * count) * Math.cos(count) * radius;
      let y = Math.cos(k * count) * Math.sin(count) * radius;
      tmp_data.push(new Vector2(x + this.location1.x, y + this.location1.y));
    }
    let poly_data = new Polygon(gl, tmp_data);
    poly_data.drawPolygon2(fill_color);
  }
}

const background = () => {
  gl.beginPath();
  gl.fillStyle = "rgba(255, 255, 255, 0.1)";
  gl.rect(0, 0, canvas.width, canvas.height);
  gl.closePath();
  gl.fill();
}

const renderFlower = () => {
  for (let count = 0; count < location1.length; count++) {
    let flower = new Flower(location1[count], velocity1[count]);
    flower.stepFlower();
    flower.drawFlower(flower_color_data[count]);
  }

}

const main = () => {

  for (let count = 0; count < location1.length; count++) {
    let circle = new Circle(location1[count], velocity1[count]);
    circle.stepCircle();
    circle.renderCircle(circle_color_data[count]);
  }
  setTimeout(renderFlower, 30000);

  requestAnimationFrame(main);

}
setup();

window.onload = main;