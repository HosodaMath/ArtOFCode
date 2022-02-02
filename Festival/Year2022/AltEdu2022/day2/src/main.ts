/**
 * AltEdu2022
 * Day2
 * Pen and Paint1
 * @todo ブラシの機能を追加したかった。
 * @todo ブラシの種類を増やしたかった。
 * @todo 画面のUIをペイントソフトみたいにしたい。
 * @todo 残像機能を追加したかった。
 * @todo 生のWebGL2やWebGPU（Rust含む）でも挑戦したい。
 */
import P5 from "p5";
import { Circle } from "./circle";
import { fullScreen } from "./fullScreen";
import vertexShader from "./shader/gradation.vert?raw";
import fragmentShader from "./shader/gradation.frag?raw";
import "sanitize.css";
import "./main.css";
const sketch = (p: P5) => {
  let circle: Circle;
  let mainShader: P5.Shader;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    p.pixelDensity(1);
    p.background("rgba(255, 255, 255, 0.1)");

    // WebGL Shaderの作成
    mainShader = p.createShader(vertexShader, fragmentShader);

    // Full Screen Mode
    fullScreen(document.body);
  };

  p.draw = () => {
    // const fillColor = p.color("rgba(40, 240, 255, 0.2)");
    [...Array(10).keys()].forEach((penCount) => {
      const shiftX = p.random(-10.0, 10.0);
      const shiftY = p.random(-10.0, 10.0);
      const posX = p.mouseX - p.width * 0.5 + shiftX;
      const posY = p.mouseY - p.height * 0.5 + shiftY;
      const position = p.createVector(posX, posY, 0);
      const size = p.createVector(penCount * 5, penCount * 5);
      circle = new Circle(p, position, size);
      circle.update();
      circle.drawShader(mainShader);
      // circle.drawFill(fillColor);
    });
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  /*
  p.mouseClicked = () => {
    const posX = p.mouseX - p.width * 0.5;
    const posY = p.mouseY - p.height * 0.5;
    const position = p.createVector(posX, posY, 0);
    const size = p.createVector(20, 20);
    circle = new Circle(p, position, size);
    circle.update();
    circle.drawShader(mainShader);
  };*/

  /*
  p.mouseMoved = () => {
    [...Array(10).keys()].forEach((penCount) => {
      const shiftX = p.random(-0.5, 0.5);
      const shiftY = p.random(-0.5, 0.5);
      const posX = p.mouseX - p.width * 0.5 + shiftX;
      const posY = p.mouseY - p.height * 0.5 + shiftY;
      const position = p.createVector(posX, posY, 0);
      const size = p.createVector(penCount + 2, penCount + 2);
      circle = new Circle(p, position, size);
      circle.update();
      circle.drawShader(mainShader);
    });
  };*/
};

new P5(sketch);
