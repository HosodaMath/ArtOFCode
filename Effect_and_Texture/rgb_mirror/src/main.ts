import * as P5 from "p5";
import * as Shader from "./shader/shader";
import plants from "./image/plants.png";
import "sanitize.css";
import "./main.css";

const sketch = (p: P5) => {
  let flag = false;
  let plants_image: P5.Image;
  let rgb_mirror_effect: P5.Shader;
  let rgb_mirror_color_effect: P5.Shader;
  let rgb_mirror_color_noise_effect: P5.Shader;
  let rgb_mirror_fbm_effect: P5.Shader;
  let rgb_mirror_rgbshift_effect: P5.Shader;
  p.preload = () => {
    plants_image = p.loadImage(plants);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();

    rgb_mirror_effect = Shader.initRGBMirror(p);
    rgb_mirror_color_effect = Shader.initRGBMirrorColor(p);
    rgb_mirror_color_noise_effect = Shader.initRGBMirrorColorNoise(p);
    rgb_mirror_fbm_effect = Shader.initRGBMirrorFbm(p);
    rgb_mirror_rgbshift_effect = Shader.initRGBMirrorShift(p);
  };

  const camera = () => {
    if (flag === true) {
      p.orbitControl();
    }
  };

  p.draw = () => {
    camera();

    p.background(0, 0, 0);

    // Shader.drawRGBMirror(p, plants_image, rgb_mirror_effect);
    // Shader.drawRGBMirrorColor(p, plants_image, rgb_mirror_color_effect);
    /*
    Shader.drawRGBMirrorColorNoise(
      p,
      plants_image,
      rgb_mirror_color_noise_effect,
      flag
    );*/
    // Shader.drawRGBMirrorFbm(p, plants_image, rgb_mirror_fbm_effect, flag);
    Shader.drawRGBMirrorShift(p, plants_image, rgb_mirror_fbm_effect, flag);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.keyPressed = () => {
    if (p.keyCode === p.LEFT_ARROW) {
      const element = document.body;
      element.requestFullscreen();
    }

    if (p.keyCode === p.UP_ARROW) {
      flag = true;
    } else {
      flag = false;
    }
  };
};

new P5(sketch);
