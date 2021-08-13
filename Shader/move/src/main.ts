/**
 * exp(-k*x)
 * なめらかに動く
 * lerp 線形補間
 * 座標移動
 * 回転
 */
import P5 from "p5";
import * as LeapMove from "./moveTransform";
import "sanitize.css";
import "./style.css";
import colors from "./image/noise.png";
import rgbCloudVertexShader from "./shader/rgbCloud/rgbCloud.vert?raw";
import rgbCloudFragmentShader from "./shader/rgbCloud/rgbCloud.frag?raw";

const sketch = (p: P5) => {
  let move: LeapMove.MoveTransform;
  let colors_image: P5.Image;
  let shader: P5.Shader;
  let time = 0.0;
  p.preload = () => {
    colors_image = p.loadImage(colors);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();

    shader = p.createShader(rgbCloudVertexShader, rgbCloudFragmentShader);

    move = new LeapMove.MoveTransform(p);
  };

  p.draw = () => {
    p.background("rgba(0, 0, 0, 1.0)");
    let deltaTime = 1.0 / 60.0;
    
    move.update(deltaTime, time);
    move.render(shader, colors_image);


  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.mousePressed = () => {
    move.targetX = p.mouseX - p.width / 2.0;
    move.targetY = p.mouseY - p.height / 2.0;
    time = 0.0;
  };

  p.touchStarted = () => {
    move.targetX = p.mouseX - p.width / 2.0;
    move.targetY = p.mouseY - p.height / 2.0;
    time = 0.0;
  };

  p.mouseDragged = () => {
    move.targetX = p.mouseX - p.width / 2.0;
    move.targetY = p.mouseY - p.height / 2.0;
    time = 0.0;
  };

  p.keyPressed = () => {
    if (p.keyCode === p.LEFT_ARROW) {
      const element = document.body;
      element.requestFullscreen();
    }
  };
};

new P5(sketch);
