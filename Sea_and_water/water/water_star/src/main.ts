import * as P5 from "p5";
import * as Shader from "./shader/shader";

import "sanitize.css";
import "./main.css";

const sketch = (p: P5) => {
  let waterShader: P5.Shader;
  
  p.setup = () => {
    //p.createCanvas(680, 480, p.WEBGL);
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    p.pixelDensity(1);

    waterShader = Shader.waterTextureStarShader(p);

  };


  const createWaterShader = (uTime: number) => {
    const planePosition = p.createVector(-p.width * 0.5, -p.height * 0.5, 0);
    const size = p.createVector(p.width, p.height);
    p.push();
    p.translate(planePosition.x, planePosition.y, planePosition.z);
    p.shader(waterShader);
    waterShader.setUniform("uResolution", [p.width, p.height]);
    waterShader.setUniform("uTime", uTime);
    p.rect(0, 0, size.x, size.y);
    p.pop();
  };

  p.draw = () => {
    const uFrameCount = p.frameCount;
    const uTime = uFrameCount * 0.05;
    //p.orbitControl();
    p.background("rgba(0, 0, 0, 1.0)");

    createWaterShader(uTime);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.keyPressed = () => {
    // Full Screen Mode
    if (p.key === "f") {
      const element = document.body;
      element.requestFullscreen();
    }

    // Save Canvas png
    if (p.key === "s") {
      p.saveCanvas(
        `file${p.year()}_${p.month()}_${p.day()}_${p.hour()}_${p.minute()}`,
        "png"
      );
    }
  };
};

new P5(sketch);
