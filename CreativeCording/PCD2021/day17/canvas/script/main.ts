import { Mathematics } from "./mathematics.js";
import { Vector2 } from "./vector.js";
import { Particle1 } from "./particle/particle1.js";
const canvas = document.querySelector("canvas");

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("not found canvas element");
}

const gl = canvas.getContext("2d")!;
if (!gl) {
  throw new Error("canvasの初期化に失敗しました。");
}


let colors: string[] = [];
let particle:Particle1[] = [];
let width = 0;
let height = 0;
let time = 0;
const setup = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  width = canvas.width;
  height = canvas.height;

  let particle_color = ["#ffebcd", "#ffe4c4", "#faebd7", "#deb887", "#fff8dc", "#ffe4b5", "#ffdead"]
  const ParticleMax = 1000;
  for (let count = 0; count < ParticleMax; count++) {
      let location1 = new Vector2(0, Mathematics.random(0, height));
      let velocity1 = new Vector2(Mathematics.random(2, 5), 0);
      let windowSize = new Vector2(width, height);
      particle[count] = new Particle1(gl, location1, velocity1, windowSize);
      let tmp = Math.floor(Mathematics.random(0, particle_color.length));
      colors[count] = particle_color[tmp];
  }

}

let background = () => {
  let gradColor = gl.createLinearGradient(width / 2.0, 0, width / 2.0, height);
  gradColor.addColorStop(0, "#1ab6ff");
  gradColor.addColorStop(0.5, "#5dd5ff");
  gradColor.addColorStop(1.0, "#d3ffff");
  gl.fillStyle = gradColor;
  gl.rect(0, 0, width, height);
  gl.fill();
}

const renderSun = () => {
  gl.beginPath();
  gl.fillStyle = "#ffffff";
  gl.shadowColor="#ffffff";
  gl.shadowBlur=10;
  gl.arc(width / 4, height / 4, 100, 0, Math.PI * 2);
  gl.closePath();
  gl.fill();
}

const renderSand = () => {
  const SHiFT_X = 200;
  const SHIFT_Y = 200;
  gl.fillStyle = "#deb887";
  gl.beginPath();
  gl.moveTo( 0-SHiFT_X, height);
  gl.bezierCurveTo(SHiFT_X, height - SHIFT_Y, width - SHiFT_X, SHIFT_Y, width + SHiFT_X, height);
  gl.closePath();
  gl.fill();

  gl.fillStyle = "#daa520";
  gl.beginPath();
  gl.moveTo( 0-SHiFT_X, height);
  gl.bezierCurveTo(SHiFT_X, SHIFT_Y, width - SHiFT_X,height - SHIFT_Y + 100, width + SHiFT_X, height);
  gl.closePath();
  gl.fill();
}

const renderParticle = () => {
  time = time + 0.1;
  let t = time / 60.0;
  //console.log(t, time);
  for (let count = 0; count < particle.length; count++) {
      particle[count].drawParticle(colors[count]);
      particle[count].stepParticle(t);
  }
}

const main = () => {
  background();
  renderSun();
  renderSand();
  renderParticle();

  requestAnimationFrame(main);

}
setup();

window.onload = main;