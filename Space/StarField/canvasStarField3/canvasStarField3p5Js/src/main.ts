import P5 from "p5";
import * as DrawP5 from "./draw_p5/draw_p5";
import * as DrawAir from "./air/air";
import * as StarField from "./starField/starField";
import "sanitize.css";
import "./style.css";

const sketch = (p: P5) => {
  const starMax = 100;

  let starFieldParameter: StarField.starFieldParameter;

  const initStarField = () => {
    const canvasSize = p.createVector(p.width, p.height);
    const starLocation: P5.Vector[] = [];
    const starSize: number[] = [];
    const starColor: string[] = [];
    const starShadowColor: string[] = [];
    const starShadowBlur: number[] = [];
    const star_color = [
      "rgba(245, 250, 200, 1.0)",
      "rgba(200, 200, 250, 1.0)",
      "rgba(200, 250, 250, 1.0)",
    ];

    [...Array(starMax).keys()].forEach((_count) => {
      const locationX = p.random(0, canvasSize.x);
      const locationY = p.random(0, canvasSize.y);
      const size = p.random(2, 5);

      const initStarLocation = p.createVector(locationX, locationY);
      starLocation.push(initStarLocation);
      starSize.push(size);

      const colorChoice = Math.floor(p.random(0, star_color.length));

      starColor.push(star_color[colorChoice]);
      starShadowColor.push(star_color[colorChoice]);
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

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    p.frameRate(60);
    starFieldParameter = initStarField();
  };

  const renderNightField = (
    canvas: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    canvasOrigin: P5.Vector,
    canvasSize: P5.Vector
  ) => {
    const night = new DrawAir.Night({
      gl: canvas,
      o: canvasOrigin,
      canvas_size: canvasSize,
    });
    night.drawNight();

    const star = new StarField.StarField(
      canvas,
      p,
      starMax,
      starFieldParameter
    );
    star.drawSrarField();
  };

  p.draw = () => {
    const canvasOrigin = p.createVector(0, 0);
    const canvasSize = p.createVector(p.width, p.height);
    const canvas = p.drawingContext.canvas.getContext("2d");
    if (!canvas) {
      throw new Error(
        "Error CanvasRenderingContext2DもしくはOffscreenCanvasRenderingContext2Dではありません😔"
      );
    }
    p.background(0, 0, 0);

   // renderNightField(canvas, canvasOrigin, canvasSize);

    canvas.save();
    const location1 = p.createVector(canvasOrigin.x, canvasOrigin.y);
    const size = 10;
    const initVertex = p.abs(p.floor(p.cos(p.frameCount * 0.01) * 4)) + 2;

    canvas.transform(1, 0, 0, 1, p.width / 2.0, p.height / 2.0);
    [...Array(5).keys()].forEach((count) => {
      const radius = Math.cos(p.frameCount * 0.01) * (count + 1) * 50;
      const gradation = canvas.createRadialGradient(
        location1.x,
        location1.y,
        0,
        location1.x,
        location1.y,
        size
      );

      const red1 = p.abs(p.cos(p.frameCount * 0.1) * 10);
      const green1 = p.abs(p.sin(p.frameCount * 0.1) * 240);
      const blue1 = 100;
      gradation.addColorStop(0.0, `rgba(${red1}, ${green1}, ${blue1}, 1.0)`);

      const red2 = 100;
      const green2 = p.abs(p.cos(p.frameCount * 0.1) * 240);
      const blue2 = p.abs(p.sin(p.frameCount * 0.1) * 240);
      gradation.addColorStop(0.5, `rgba(${red2}, ${green2}, ${blue2}, 1.0)`);

      const red3 = 100;
      const green3 = p.abs(p.cos(p.frameCount * 0.1) * 240);
      const blue3 = 100;
      gradation.addColorStop(0.8, `rgba(${red3}, ${green3}, ${blue3}, 1.0)`);

      [...Array(360).keys()].forEach((theta) => {
        if (theta % 30 === 0) {
          let locationX =
            Math.cos(p.radians(theta) + p.frameCount * 0.01) * radius;
          let locationY =
            Math.sin(p.radians(theta) + p.frameCount * 0.01) * radius;

          const transLocation = p.createVector(locationX, locationY);

          canvas.save();
          canvas.transform(1, 0, 0, 1, transLocation.x, transLocation.y);
          canvas.transform(
            Math.cos(p.radians(p.frameCount * 0.5)),
            Math.sin(p.radians(p.frameCount * 0.5)),
            -Math.sin(p.radians(p.frameCount * 0.5)),
            Math.cos(p.radians(p.frameCount * 0.5)),
            location1.x,
            location1.y
          );
          const star = new DrawP5.StarGeometryP5(
            p,
            location1,
            size,
            initVertex
          );
          star.drawGradientColor(canvas, {
            fillColor: gradation,
            strokeColor: "rgba(240, 240, 240, 1.0)",
            strokeWidth: 1.0,
            starShadowColor: "rgba(240, 240, 240, 1.0)",
            starShadowBlur: 5,
          });
          canvas.restore();
        }
      });
    });
    canvas.restore();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.keyPressed = () => {
    if (p.keyCode === p.LEFT_ARROW) {
      const element = document.body;
      element.requestFullscreen();
    }
  };
};

new P5(sketch);
