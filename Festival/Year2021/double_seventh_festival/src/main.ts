/**
 * Double Sventh Festival and StarrySea
 * I can make it full screen, but the screen stays black. I'll fix it later.
 */
import * as Draw from "./draw/draw";
import * as Star from "./star/star";
import * as Tanzaku from "./tanzaku/tanzaku";
import "./main.css";
const canvas = document.querySelector("#canvas");
// canvasのサポートがない場合
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("not found canvas element");
}

const gl = canvas.getContext("2d");
if (!gl) {
  throw new Error("canvasの初期化に失敗しました");
}

const starMax = 50;
const tanzakuMax = 10;
let width = 0;
let height = 0;

// 星の海関係
let star: Star.NormalStar2D[] = [];
let starColor: Star.NormalStar2DType[] = [];

// Tanzaku
let tanzaku: Tanzaku.Tanzaku2D[] = [];
let tanzakuColor: Tanzaku.TanzakuColorType[] = [];

const initResize = () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
};

const init = () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initResize();
  window.addEventListener("resize", initResize);
  window.addEventListener("keydown", (event) => {
    if (event.key === "f" || event.key === "F") {
      console.log("push f or F!!");
      const element = document.body;
      element.requestFullscreen();
    }
  });
  initStarrySea();
  initTanzaku();
};

/**
 * 星の海を初期化する
 */
const initStarrySea = () => {
  // 星の色と影の色は対応しているつまり同じ色にする
  const starColorData = [
    "rgba(250, 102, 203, 1.0)",
    "rgba(250, 250, 100, 1.0)",
    "rgba(102, 240, 250, 1.0)",
  ];

  const starShadowColorData = [
    "rgba(250, 102, 203, 0.5)",
    "rgba(250, 250, 100, 0.5)",
    "rgba(102, 240, 250, 0.5)",
  ];
  if (starColorData.length === starShadowColorData.length) {
    [...Array(starMax).keys()].forEach((_count) => {
      // 星の位置
      const initPositionX = Draw.Random.random(0, width);
      const initPositionY = Draw.Random.random(0, height);
      const starPosition = new Draw.Vector2(initPositionX, initPositionY);
      // 星の大きさ
      const starSize = Draw.Random.random(2, 10);
      // 星の生成
      const initStar = new Star.NormalStar2D(gl, starPosition, starSize);
      star.push(initStar);

      // 星の色と影
      const colorChoice = Math.floor(
        Draw.Random.random(0, starColorData.length)
      );
      const initStarColor: Star.NormalStar2DType = {
        fillColor: starColorData[colorChoice],
        shadowColor: starShadowColorData[colorChoice],
        shadowSize: Draw.Random.random(5, 20),
      };

      starColor.push(initStarColor);
    });
  } else {
    throw new Error(
      "星の色と影の色は対応しているので同じ個数でなければなりません。"
    );
  }
};

const initTanzaku = () => {
  // 星の色と短冊の色は対応している
  const tanzakuColorData = [
    "rgba(250, 102, 203, 1.0)",
    "rgba(250, 250, 100, 1.0)",
    "rgba(102, 240, 250, 1.0)",
  ];

  const tanzakuShadowColorData = [
    "rgba(250, 102, 203, 0.3)",
    "rgba(250, 250, 100, 0.3)",
    "rgba(102, 240, 250, 0.3)",
  ];

  if (tanzakuColorData.length === tanzakuShadowColorData.length) {
    [...Array(tanzakuMax).keys()].forEach((_count) => {
      // Tanzakuの位置
      const initPositionX = Draw.Random.random(0, width);
      const initPositionY = Draw.Random.random(0, height);
      const tanzakuPosition = new Draw.Vector2(initPositionX, initPositionY);

      // Tanzakuの速度
      const initVelocityX = 0;
      const initVelocityY = Draw.Random.random(1, 2);
      const tanzakuVelocity = new Draw.Vector2(initVelocityX, initVelocityY);

      // Tanzakuの大きさ
      const tanzakuSizeX = Draw.Random.random(30, 50);
      const tanzakuSizeY = Draw.Random.random(100, 150);
      const tanzakuSize = new Draw.Vector2(tanzakuSizeX, tanzakuSizeY);

      // Tanzakuの生成
      const initTanzaku = new Tanzaku.Tanzaku2D(
        gl,
        tanzakuPosition,
        tanzakuVelocity,
        tanzakuSize
      );
      tanzaku.push(initTanzaku);

      // tanzakuの色と影
      const colorChoice = Math.floor(
        Draw.Random.random(0, tanzakuColorData.length)
      );
      const initTanzakuColor: Tanzaku.TanzakuColorType = {
        fillColor: tanzakuColorData[colorChoice],
        shadowColor: tanzakuShadowColorData[colorChoice],
        shadowSize: Draw.Random.random(5, 20),
      };

      tanzakuColor.push(initTanzakuColor);
    });
  } else {
    throw new Error(
      "Tanzakuの色と影の色は対応しているので同じ個数でなければなりません。"
    );
  }
};

const background = (color = "#000000") => {
  gl.save();
  const Origin = new Draw.Vector2(0, 0);
  gl.beginPath();
  const windowSize = new Draw.Vector2(canvas.width, canvas.height);
  const rect = new Draw.Rectangle(gl, Origin, windowSize);
  rect.draw_fill(color);
  gl.closePath();
};

/**
 * 空を描く
 */
const paintAir = () => {
  const grad = gl.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0.0, "rgba(3, 11, 50, 1.0)");
  grad.addColorStop(0.5, "rgba(80, 90, 150, 1.0)");
  grad.addColorStop(1.0, "rgba(3, 11, 50, 1.0)");

  const Origin = new Draw.Vector2(0, 0);
  const windowSize = new Draw.Vector2(canvas.width, canvas.height);
  const rect = new Draw.Rectangle(gl, Origin, windowSize);
  rect.draw_fill(grad);
};

/**
 * 星の海を追加する
 */
const drawStarrySea = () => {
  [...Array(star.length).keys()].forEach((count) => {
    star[count].drawStaticStar(starColor[count]);
  });
};

const drawTanzaku = () => {
  [...Array(tanzaku.length).keys()].forEach((count) => {
    tanzaku[count].drawTanzaku(tanzakuColor[count]);
  });
};

const draw = () => {
  background();
  paintAir();
  drawStarrySea();
  drawTanzaku();

  requestAnimationFrame(draw);
};

const render = () => {
  init();
  draw();
};

window.onload = render;
