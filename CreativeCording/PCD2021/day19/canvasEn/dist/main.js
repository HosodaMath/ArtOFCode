//import { Color } from "./color/color.js"; -> 動作しない?
import { Vector2 } from "./mathematics/vector.js";
import { Mathematics } from "./mathematics/mathematics.js";
import { StarField } from "./background/starField.js";
import { Moon } from "./background/moon.js";
import { Mountain1 } from "./background/mountain.js";
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
// 星の世界の変数
let starField;
let star_location = [];
let star_radius = [];
let colors = [];
// 月の世界の変数
let moon1;
let moon2;
let moon_location1 = new Vector2(0, 0);
let moon_radius1 = 0;
let moon_location2 = new Vector2(0, 0);
let moon_radius2 = 0;
// 山の世界の変数
let mountain = [];
let mountain_color = [];
const setup = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;
    // set StarField
    const MAX = 100;
    let colorDict = ["#ffffff", "#ff0000", "#00ff00", "#00ffff"];
    for (let count = 0; count < MAX; count++) {
        // 星の座標データ
        star_location[count] = new Vector2(Mathematics.random(0, width), Mathematics.random(0, height));
        // 星の半径データ
        star_radius.push(Mathematics.random(2, 4));
        // 星のカラーデータ
        let tmp_color_data = Math.floor(Mathematics.random(0, colorDict.length));
        colors.push(colorDict[tmp_color_data]);
    }
    setStar(star_location, star_radius);
    // moon field
    moon_location1 = new Vector2(width / 4, height / 4);
    moon_radius1 = width / 15;
    moon_location2 = new Vector2(width - width / 4, height - height / 3);
    moon_radius2 = width / 13;
    setMoon(moon_location1, moon_radius1, moon_location2, moon_radius2);
    // mountain field
    let mountain_data1 = [];
    let mountain_data2 = [];
    let init_data_x1 = [0, width / 2.0, width];
    let init_data_y1 = [height, height / 2.0, height];
    let init_data_x2 = [0, width / 4.0, width / 2.0];
    let init_data_y2 = [height, height - height / 4.0, height];
    for (let count = 0; count < 3; count++) {
        let tmp_data1 = new Vector2(init_data_x1[count], init_data_y1[count]);
        mountain_data1.push(tmp_data1);
        let tmp_data2 = new Vector2(init_data_x2[count], init_data_y2[count]);
        mountain_data2.push(tmp_data2);
    }
    setMountain(mountain_data1, mountain_data2);
};
/**
 * 星の世界の座標と大きさをセット
 * @param {Vector2[]} star_location - 星の座標
 * @param {number[]} star_radius - 星の大きさ
 */
const setStar = (star_location, star_radius) => {
    starField = new StarField(gl, star_location, star_radius);
};
/**
 * 月の世界をセット
 * @param {Vector2} moon_location1
 * @param {number} moon_radius1
 * @param {Vector2} moon_location2
 * @param {number} moon_radius2
 */
const setMoon = (moon_location1, moon_radius1, moon_location2, moon_radius2) => {
    moon1 = new Moon(gl, moon_location1, moon_radius1);
    moon2 = new Moon(gl, moon_location2, moon_radius2);
};
/**
 * 山の世界をセット
 * @param {Vector2[]} mountain_data1
 * @param {Vector2[]} mountain_data2
 */
const setMountain = (mountain_data1, mountain_data2) => {
    let tmp_mountain1 = new Mountain1(gl, mountain_data1);
    mountain.push(tmp_mountain1);
    let tmp_mountain2 = new Mountain1(gl, mountain_data2);
    mountain.push(tmp_mountain2);
    let gradient_color1 = gl.createLinearGradient(width / 2, height / 2.0, width / 2, height);
    gradient_color1.addColorStop(0.0, "#006620");
    gradient_color1.addColorStop(0.5, "#02541c");
    gradient_color1.addColorStop(1.0, "#00300f");
    mountain_color.push(gradient_color1);
    let gradient_color2 = gl.createLinearGradient(width / 4, height / 4.0, width / 4, height);
    gradient_color2.addColorStop(0.0, "#006620");
    gradient_color2.addColorStop(0.5, "#02541c");
    gradient_color2.addColorStop(1.0, "#00300f");
    mountain_color.push(gradient_color2);
};
/**
 *
 * @param {string} color - background color
 */
const background = (color = "rgb(255, 255, 255)") => {
    gl.beginPath();
    gl.fillStyle = color;
    gl.rect(0, 0, width, height);
    gl.closePath();
    gl.fill();
};
/**
 * 星の世界を表示
 */
const renderStarField = () => {
    starField.drawStarField(colors);
};
/**
 * 月の世界を描く
 */
const renderMoon = () => {
    moon1.drawMoon("#ffff00");
    moon2.drawMoon("#0000ff");
};
const renderMountain = () => {
    for (let count = 0; count < mountain.length; count++) {
        mountain[count].drawMountain1(mountain_color[count]);
    }
};
const renderTitle = () => {
    gl.textAlign = "center";
    gl.textBaseline = "middle";
    gl.font = "40px fantasy";
    gl.fillStyle = "#ffffff";
    //gl.fillText("Hello Blue Moon", width / 2, height / 4);
    gl.fillText("Hello Blue Moon!!", width / 2, height / 4);
};
const renderAuthor = () => {
    gl.textAlign = "center";
    gl.textBaseline = "middle";
    gl.font = "10px fantasy";
    gl.fillStyle = "#ffffff";
    //gl.fillText("Hello Blue Moon", width / 2, height / 4);
    gl.fillText("visual Shingo Hosoda", width / 2, height - height / 10);
};
const main = () => {
    background("rgba(5, 5, 30, 1.0)");
    renderStarField();
    renderMoon();
    renderMountain();
    renderTitle();
    renderAuthor();
    //requestAnimationFrame(main);
};
setup();
window.onload = main;
