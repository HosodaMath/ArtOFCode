//import { Color } from "./color/color.js"; -> 動作しない?
import { Vector2 } from "./mathematics/vector.js";
import { Mathematics } from "./mathematics/mathematics.js";
import { StarField } from "./background/starField.js";
import { Moon } from "./background/moon.js";
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
let starField;
let star_location = [];
let star_radius = [];
let colors = [];
let moon1;
let moon2;
let moon_location1 = new Vector2(0, 0);
let moon_radius1 = 0;
let moon_location2 = new Vector2(0, 0);
let moon_radius2 = 0;
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
    moon_location1 = new Vector2(width - width / 2, height / 4);
    moon_radius1 = width / 25;
    setMoon1(moon_location1, moon_radius1);
    moon_location2 = new Vector2(width / 4, height / 4);
    moon_radius2 = width / 20;
    setMoon2(moon_location2, moon_radius2);
};
/**
 * 星の世界の座標と大きさをセット
 * @param {Vector2[]} star_location - 星の座標
 * @param {number[]} star_radius - 星の大きさ
 */
let setStar = (star_location, star_radius) => {
    starField = new StarField(gl, star_location, star_radius);
};
/**
 * 月の世界をセット1
 * @param {Vector2} moon_location
 * @param {number} moon_radius1
 */
let setMoon1 = (moon_location, moon_radius) => {
    moon1 = new Moon(gl, moon_location, moon_radius);
};
/**
 * 月の世界をセット2
 * @param {Vector2} moon_location
 * @param {number} moon_radius
 */
let setMoon2 = (moon_location, moon_radius) => {
    moon2 = new Moon(gl, moon_location, moon_radius);
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
const main = () => {
    background("rgba(5, 5, 30, 1.0)");
    renderStarField();
    renderMoon();
    requestAnimationFrame(main);
};
setup();
window.onload = main;
