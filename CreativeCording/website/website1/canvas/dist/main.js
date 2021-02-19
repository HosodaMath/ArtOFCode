import { Mathematics } from "./mathematics.js";
import { Vector2 } from "./vector.js";
import { Particle } from "./particle/particle1.js";
import { Color } from "./color/color.js";
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
let particle = [];
let colors = [];
const setup = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;
    const MAX = 20;
    for (let count = 0; count < MAX; count++) {
        let init_location = new Vector2(Mathematics.random(0, width), Mathematics.random(0, height));
        let init_velocity = new Vector2(Mathematics.random(-2, 2), Mathematics.random(-2, 2));
        particle[count] = new Particle(gl, init_location, init_velocity);
        colors[count] = Color.rgba(Mathematics.random(200, 250), Mathematics.random(200, 255), Mathematics.random(150, 200));
    }
};
const background = () => {
    gl.beginPath();
    gl.fillStyle = Color.rgba(0, 0, 0, 0.3);
    gl.rect(0, 0, width, height);
    gl.closePath();
    gl.fill();
};
const renderParticle = () => {
    for (let count = 0; count < colors.length; count++) {
        let windowSize = new Vector2(width, height);
        particle[count].addParticle(windowSize);
        particle[count].drawParticle(colors[count]);
    }
};
const main = () => {
    background();
    renderParticle();
    requestAnimationFrame(main);
};
setup();
window.onload = main;
