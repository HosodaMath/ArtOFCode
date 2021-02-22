//import { Color } from "./color/color.js"; -> 動作しない?
import { Vector2 } from "./mathematics/vector.js";
import { Mathematics } from "./mathematics/mathematics.js";
import { StarField } from "./background/starField.js";
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
let starField: StarField;
let star_location: Vector2[] = [];
let star_radius: number[] = [];
let colors: string[] = [];
const setup = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;
  // set StarField
  const MAX = 100;
 
  let colorDict: string[] = ["#ffffff", "#ff0000", "#00ff00", "#00ffff"];
  
  for (let count = 0; count < MAX; count++) {
    // 星の座標データ
    star_location[count] = new Vector2(
      Mathematics.random(0, width),
      Mathematics.random(0, height)
    );
    // 星の半径データ
    star_radius.push(Mathematics.random(2, 4));
    
    // 星のカラーデータ
    let tmp_color_data = Math.floor(Mathematics.random(0, colorDict.length));
    colors.push(colorDict[tmp_color_data]);
  }

  setStar(star_location, star_radius);
}

/**
 * 星の世界の座標と大きさをセット
 * @param {Vector2[]} star_location - 星の座標
 * @param {number[]} star_radius - 星の大きさ
 */
let setStar = (star_location: Vector2[], star_radius: number[]) => {
  starField = new StarField(gl, star_location, star_radius);
}

/**
 * 
 * @param {string} color - background color 
 */
const background = (color: string = "rgb(255, 255, 255)") => {
  gl.beginPath();
  gl.fillStyle = color;
  gl.rect(0, 0, width, height);
  gl.closePath();
  gl.fill();
}

const renderStarField = () => {
  starField.drawStarField(colors);
}

const main = () => {
  background("rgba(5, 5, 30, 1.0)");
  renderStarField();

  requestAnimationFrame(main);

}
setup();

window.onload = main;