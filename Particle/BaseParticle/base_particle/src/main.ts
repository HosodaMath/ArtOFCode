/**
 * Basic Particle
 */
import * as Draw from "./draw/draw";
import * as AquaWorld from "./world/world";
import * as Bio from "./bio/bio";
import * as Particle from "./particle/particle";

const canvas = document.querySelector("#canvas");
// canvasのサポートがない場合
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("not found canvas element");
}

const gl = canvas.getContext("2d");
if (!gl) {
  throw new Error("canvasの初期化に失敗しました");
}

let width = 0;
let height = 0;
const initResize = () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
};

/**
 * @description fキーを押したら全画面表示
 */
const keyEvent = (element: HTMLElement) => {
  window.addEventListener("keydown", (event) => {
    // console.log(event.key, event.code);
    if (event.code == "KeyF") {
      alert("fをクリックしましたね");
      /*
        if (element.requestFullscreen()) {
          element.requestFullscreen();
        } else {
          console.log("Hello");
        }*/
    }
  });
};

const init = () => {
  initResize();
  window.addEventListener("resize", initResize);
  const element = document.body;
  keyEvent(element);
};

/*
const background = (color = "#000000") => {
  const startSize = new Draw.Vector2(0, 0);
  const windowSize = new Draw.Vector2(canvas.width, canvas.height);

  const rect = new Draw.Rectangle(gl, startSize, windowSize);
  rect.draw_fill(color);
};*/

const main = () => {
  //background();
  const canvasSize = new Draw.Vector2(width, height);
  AquaWorld.aqua(gl, canvasSize);

  const fish = new Bio.FishMob(gl);
  fish.drawFishMobS("rgba(150, 150, 150, 0.5)", canvasSize);

  const particle = new Particle.BaseParticleBuble(gl);
  particle.drawBaseParticleBuble(canvasSize);
};

const render = () => {
  init();
  main();
};

window.onload = render;
