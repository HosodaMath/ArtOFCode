/**
 * PostProcessing and Image Effector
 */
import P5 from "p5";
import * as PostProcessing from "./shader/postProcessing/postProcessing";
import "sanitize.css";
import "./style.css";
import NoiseImage from "./image/noise.png";
import PlantsImage from "./image/plants.png";
import PaintImage from "./image/paint_background.png";

const sketch = (p: P5) => {
  let colors_image: P5.Image;
  let plants_image: P5.Image;
  let paint_image: P5.Image;
  let shader: P5.Shader;
  p.preload = () => {
    colors_image = p.loadImage(NoiseImage);
    plants_image = p.loadImage(PlantsImage);
    paint_image = p.loadImage(PaintImage);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();

    shader = PostProcessing.MirrorStarShader.setMirrorStarShader(p);
  };

  p.draw = () => {
    p.orbitControl();
    p.background("rgba(0, 0, 0, 1.0)");

    PostProcessing.MirrorStarShader.renderMirrorStarShader(p, shader, colors_image);
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
