import * as Draw from "./draw/draw";
import * as Night from "./paint/night";
import * as StarField from "./paint/nightStarField/starField";
import "sanitize.css";
import "./style.css";
console.log("lets Enjoy Canvas");

const canvas = document.querySelector("#canvas");
// canvasのサポートがない場合
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("not found canvas element");
}

const gl = canvas.getContext("2d");
if (!gl) {
  throw new Error("canvasの初期化に失敗しました");
}

// 原点 Origin
const O = new Draw.Vector2(0, 0);

// 画面の横幅
let width = 0;

// 画面の高さ
let height = 0;

// canvasの大きさ
let canvas_size: Draw.Vector2;

// フレームカウント
let frameCount = 0;

// 背景の星
let backgroundStarData: StarField.BackGroundStarParameters;

// 星
let star: StarField.Star[] = [];
let starColor: string[] = [];

/**
 * windowResized
 */
const initResize = () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  canvas_size = new Draw.Vector2(width, height);
  initStar();
};

const initStar = () => {
  // 背景の星を初期化
  backgroundStarData = StarField.initBackgroundStarField(O, canvas_size);

  // 描画するメインの星を初期化する
  const starColorSet = [
    "rgba(245, 250, 200, 1.0)",
    "rgba(200, 200, 250, 1.0)",
    "rgba(200, 250, 250, 1.0)",
  ];

  [...Array(20).keys()].forEach((_count) => {
    const initStarPosition = new Draw.Vector2(
      Draw.Random.random(O.x, canvas_size.x),
      Draw.Random.random(O.y, canvas_size.y)
    );
    const initStarVelocity = new Draw.Vector2(0.5, 0.5);
    const initStarSize = 10;
    const initStar = new StarField.Star(
      gl,
      initStarPosition,
      initStarVelocity,
      initStarSize
    );
    star.push(initStar);

    const choice = Math.floor(Draw.Random.random(0, starColorSet.length));
    starColor.push(starColorSet[choice]);
  });
};

/**
 * windowInit
 */
const init = () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  canvas_size = new Draw.Vector2(width, height);

  initResize();
  window.addEventListener("resize", initResize);
  window.addEventListener("keydown", (event) => {
    if (event.key === "f" || event.key === "F") {
      console.log("push f or F!!");
      const element = document.body;
      element.requestFullscreen();
    }
  });

  initStar();
};

const background = () => {
  const windowRect = new Draw.Rectangle(gl, O, canvas_size);
  windowRect.draw_fill("rgba(0, 0, 0, 0.5)");
};

const draw = () => {
  frameCount = frameCount + 1;
  background();
  Night.night(gl, O, canvas_size);
  StarField.drawBackgroundStarField(gl, backgroundStarData);
  [...Array(star.length).keys()].forEach((count) => {
    star[count].updateStar(canvas_size);
    star[count].drawStar(5, starColor[count], frameCount * 0.005);
  });
  requestAnimationFrame(draw);
};

const render = () => {
  init();
  draw();
};

window.onload = render;
