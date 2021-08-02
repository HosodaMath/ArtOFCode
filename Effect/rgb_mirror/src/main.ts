import * as P5 from "p5";
import * as Shader from "./shader/shader";
import plants from "./image/plants.png";
import "sanitize.css";
import "./main.css";

const sketch = (p: P5) => {
  let plants_image: P5.Image;
  let rgb_split_effect: P5.Shader;
  let rgb_wave_effect: P5.Shader;
  let rgb_wave_gradient_effect: P5.Shader;
  let rgb_mirror_effect: P5.Shader;
  let rgb_mirror_color_effect: P5.Shader;
  p.preload = () => {
    plants_image = p.loadImage(plants);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();

    rgb_split_effect = Shader.initRGBSplit(p);
    rgb_wave_effect = Shader.initRGBWave(p);
    rgb_wave_gradient_effect = Shader.initRGBWaveGradient(p);
    rgb_mirror_effect = Shader.initRGBMirror(p);
    rgb_mirror_color_effect = Shader.initRGBMirrorColor(p);
  };

  const camera = () => {
    p.orbitControl();
  };

  p.draw = () => {
    camera();

    p.background(0, 0, 0);

    // Shader.drawRGBSplit(p, plants_image, rgb_split_effect);
    // Shader.drawRGBWave(p, plants_image, rgb_wave_effect);
    // Shader.drawRGBWaveGradient(p, plants_image, rgb_wave_gradient_effect);
    // Shader.drawRGBMirror(p, plants_image, rgb_mirror_effect);
    Shader.drawRGBMirrorColor(p, plants_image, rgb_mirror_color_effect);
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
