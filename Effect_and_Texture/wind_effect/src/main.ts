import * as P5 from "p5";
import * as GLMath from "./math/GLMath";
import * as Audio from "./audio";
import plants from "./image/plants.png";
import vertexShader from "./shader/wind.vert";
import fragmentShader from "./shader/wind.frag";
import "sanitize.css";
import "./main.css";

const sketch = (p: P5) => {
  let plants_image: P5.Image;
  let wind_effect: P5.Shader;
  let angle = 0;
  p.preload = () => {
    plants_image = p.loadImage(plants);
  };

  const setAudio = () => {
    Audio.audioPlay();
    Audio.audioStop();
  };


  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    wind_effect = p.createShader(vertexShader, fragmentShader);
    setAudio();
    // console.log(vertexShader);
    // console.log(fragmentShader);
  };

  const camera = () => {
    p.orbitControl();
  };

  p.draw = () => {
    camera();
    const planeSize = new GLMath.Vector2(800, 800);
    const planeLocation = new GLMath.Vector2(0, 0);
    p.background(0, 0, 0);
    
    p.shader(wind_effect);
    wind_effect.setUniform("uNoiseTexture", plants_image);
    //rgb_split_effect.setUniform("resolution", [p.width, p.height]);
    wind_effect.setUniform("uFrameCount", p.frameCount * 0.05);
    
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
    
    // p.texture(plants_image);
    p.plane(planeSize.x, planeSize.y, 200, 200);
    p.pop();

    // 回転したい場合は0以外の値を入れる
    angle += 0.0;
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
