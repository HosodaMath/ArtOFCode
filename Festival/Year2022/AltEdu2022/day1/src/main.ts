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
    
    const position = p.createVector(0, 0, 0);
    const size = p.createVector(200, 200);
    circle = new Circle(p, position, size);

    // WebGL Shaderの作成
    mainShader = p.createShader(vertexShader, fragmentShader);

    // Full Screen Mode
    fullScreen(document.body);
  };

  p.draw = () => {
    p.background(0, 0, 0);

    circle.update();
    circle.draw(mainShader);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new P5(sketch);
