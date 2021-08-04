import * as P5 from "p5";
import * as GLMath from "./math/GLMath";
import plants from "./image/plants.png";
import rgbSplitVertexShader from "./shader/rgb_split.vert";
import rgbSplitFragmentShader from "./shader/rgb_split.frag";
import rgbWaveVertexShader from "./shader/rgb_wave3.vert";
import rgbWaveFragmentShader from "./shader/rgb_wave3.frag";
import "sanitize.css";
import "./main.css";

const sketch = (p: P5) => {
  let plants_image: P5.Image;
  let rgb_split_effect: P5.Shader;
  let rgb_wave_effect: P5.Shader;
  let angle = 0;
  p.preload = () => {
    plants_image = p.loadImage(plants);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    rgb_split_effect = p.createShader(
      rgbSplitVertexShader,
      rgbSplitFragmentShader
    );

    rgb_wave_effect = p.createShader(
      rgbWaveVertexShader,
      rgbWaveFragmentShader
    );

    console.log(typeof plants);
  };

  const camera = () => {
    p.orbitControl();
  };

  /**
   * uniformへの値パラメーターを考える
   * @param image
   */
  const drawRGBSplit = (image: P5.Image) => {
    const planeSize = new GLMath.Vector2(800, 800);
    const planeLocation = new GLMath.Vector2(0, 0);
    p.shader(rgb_split_effect);
    rgb_split_effect.setUniform("uTexture", image);
    rgb_split_effect.setUniform("resolution", [p.width, p.height]);
    rgb_split_effect.setUniform("time", p.frameCount * 0.05);
    p.push();
    p.applyMatrix(1, 0, 0, 1, planeLocation.x, planeLocation.y);
    const radian = GLMath.degreeToRadian(angle);
    p.applyMatrix(
      Math.cos(radian),
      Math.sin(radian),
      -Math.sin(radian),
      Math.cos(radian),
      planeLocation.x,
      planeLocation.y
    );
   
    p.plane(planeSize.x, planeSize.y, 200, 200);
    p.pop();

    // 回転したい場合は0以外の値を入れる
    angle += 0.0;

    p.resetShader();
  };

  /**
   *
   * @param image
   */
  const drawRGBWave = (image: P5.Image) => {
    const planeSize = new GLMath.Vector2(800, 800);
    const planeLocation = new GLMath.Vector2(0, 0);
    p.shader(rgb_wave_effect);
    rgb_wave_effect.setUniform("uTexture", image);
    rgb_wave_effect.setUniform("uFrameCount", p.frameCount * 0.05);
    p.push();
    p.applyMatrix(1, 0, 0, 1, planeLocation.x, planeLocation.y);
    const radian = GLMath.degreeToRadian(angle);
    p.applyMatrix(
      Math.cos(radian),
      Math.sin(radian),
      -Math.sin(radian),
      Math.cos(radian),
      planeLocation.x,
      planeLocation.y
    );
    // p.plane(planeSize.x, planeSize.y, 200, 200);
    p.sphere(planeSize.x / 2, 200, 200);
    p.pop();

    // 回転したい場合は0以外の値を入れる
    angle += 0.0;

    p.resetShader();
  };

  p.draw = () => {
    camera();

    p.background(0, 0, 0);

    // drawRGBSplit(plants_image);

    drawRGBWave(plants_image);
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
