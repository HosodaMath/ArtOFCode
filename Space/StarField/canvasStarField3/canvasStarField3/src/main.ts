import * as Draw from "./draw/draw";
import * as Air from "./paint/air/air";
import * as StarField from "./paint/starField/starField";
import "sanitize.css";
import "./style.css";

const canvas = document.querySelector("#canvas");
// canvasのサポートがない場合
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("not found canvas element");
}

const gl = canvas.getContext("2d");
if (!gl) {
  throw new Error("canvasの初期化に失敗しました");
}

const O = new Draw.Vector2(0, 0);

const starMax = 100;

let width = 0;

let height = 0;

let canvas_size: Draw.Vector2;

let frameCount = 0;

let starFieldParameter: StarField.starFieldParameter;

/**
 * windowResized
 */
const initResize = () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  canvas_size = new Draw.Vector2(width, height);
};

/**
 *
 * @returns
 */
const initStarField = () => {
  const starLocation: Draw.Vector2[] = [];
  const starSize: number[] = [];
  const starColor: string[] = [];
  const starShadowColor: string[] = [];
  const starShadowBlur: number[] = [];
  const starColorData = [
    "rgba(245, 250, 200, 1.0)",
    "rgba(200, 200, 250, 1.0)",
    "rgba(200, 250, 250, 1.0)",
  ];

  const starShadowColorData = "rgba(240, 240, 100, 1.0)";

  [...Array(starMax).keys()].forEach((_theta) => {
    const locationX = Draw.Random.random(0, canvas_size.x);
    const locationY = Draw.Random.random(0, canvas_size.y);
    const size = Draw.Random.random(2, 5);

    const initStarLocation = new Draw.Vector2(locationX, locationY);
    starLocation.push(initStarLocation);
    starSize.push(size);

    const colorChoice = Math.floor(Draw.Random.random(0, starColorData.length));

    starColor.push(starColorData[colorChoice]);
    starShadowColor.push(starShadowColorData);
    starShadowBlur.push(10);
  });

  const parameter: StarField.starFieldParameter = {
    starLocation: starLocation,
    starSize: starSize,
    starColor: starColor,
    starShadowColor: starShadowColor,
    starShadowBlur: starShadowBlur,
  };

  return parameter;
};

/**
 * windowInit
 */
const init = () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  canvas_size = new Draw.Vector2(width, height);

  starFieldParameter = initStarField();

  initResize();
  window.addEventListener("resize", initResize);
  window.addEventListener("keydown", (event) => {
    if (event.key === "f" || event.key === "F") {
      console.log("push f or F!!");
      const element = document.body;
      element.requestFullscreen();
    }
  });
};

const background = () => {
  const windowRect = new Draw.Rectangle(gl, O, canvas_size);
  windowRect.draw_fill("rgba(0, 0, 0, 1.0)");
};

const draw = () => {
  background();
  const night = new Air.Night({ gl: gl, o: O, canvas_size: canvas_size });
  night.drawNight();

  const star = new StarField.StarField(gl, starMax, starFieldParameter);
  star.drawSrarField();

  const initLocation = new Draw.Vector2(0, 0);
  const initSize = 20;
  const initVertex = Math.abs(Math.floor(Math.cos(frameCount * 0.01) * 6)) + 3;

  gl.save();
  gl.transform(1, 0, 0, 1, width / 2.0, height / 2.0);
  [...Array(3).keys()].forEach((count) => {
    const radius = Math.cos(frameCount * 0.01) * (count + 1) * 50;
    [...Array(360).keys()].forEach((theta) => {
      if (theta % 30 === 0) {
        let locationX =
          Math.cos(Draw.Mathematics.degTorad(theta) + frameCount * 0.01) *
          radius;
        let locationY =
          Math.sin(Draw.Mathematics.degTorad(theta) + frameCount * 0.02) *
          radius;

        const transLocation = new Draw.Vector2(locationX, locationY);

        const gradColor = gl.createRadialGradient(
          initLocation.x,
          initLocation.y,
          0,
          initLocation.x,
          initLocation.y,
          initSize
        );
        
        /// color change animation
        const redColor1 = 240;
        const greenColor1 = redColor1;
        const blueColor1 = Math.abs(Math.cos(frameCount * 0.005) * 200);
        gradColor.addColorStop(
          0.0,
          `rgba(${redColor1}, ${greenColor1}, ${blueColor1}, 0.8)`
        );

        const redColor2 = Math.abs(Math.cos(frameCount * 0.005) * 200);
        const greenColor2 = 240;
        const blueColor2 = Math.abs(Math.sin(frameCount * 0.005) * 200);
        gradColor.addColorStop(
          0.5,
          `rgba(${redColor2}, ${greenColor2}, ${blueColor2}, 0.6)`
        );

        const redColor3 = Math.abs(Math.cos(frameCount * 0.005) * 200);
        const greenColor3 = Math.abs(Math.sin(frameCount * 0.005) * 200);
        const blueColor3 = 240;
        gradColor.addColorStop(
          1.0,
          `rgba(${redColor3}, ${greenColor3}, ${blueColor3}, 0.4)`
        );

        gl.save();
        gl.transform(1, 0, 0, 1, transLocation.x, transLocation.y);
        gl.transform(
          Math.cos(Draw.Mathematics.degTorad(frameCount * 0.5)),
          Math.sin(Draw.Mathematics.degTorad(frameCount * 0.5)),
          -Math.sin(Draw.Mathematics.degTorad(frameCount * 0.5)),
          Math.cos(Draw.Mathematics.degTorad(frameCount * 0.5)),
          locationX,
          locationY
        );
        const polygon = new Draw.PolygonGeometry(
          gl,
          initLocation,
          initSize,
          initVertex,
          initVertex,
        );
        gl.shadowColor = "rgba(255, 255, 255, 1.0)";
        gl.shadowBlur = 10;
        polygon.draw({
          fillColor: gradColor,
          strokeColor: "rgba(255, 255, 255, 1.0)",
          strokeWidth: 1.0,
        });
        gl.restore();
      }
    });
  });
  gl.restore();

  // console.log(frameCount);
  frameCount = requestAnimationFrame(draw);
};

const render = () => {
  init();
  draw();
};

window.onload = render;
