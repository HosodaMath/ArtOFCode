import * as P5 from "p5";
import * as Geometry from "./geometry/geometry";
import * as Shader from "./shader/shader";
import "sanitize.css";
import "./main.css";

const sketch = (p: P5) => {
  let mainShader: P5.Shader;
  p.setup = () => {
    //p.createCanvas(680, 480, p.WEBGL);
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    p.pixelDensity(1);

    mainShader = Shader.morphineShader(p);
  };

  const drawMorphine = () => {
    const uFrameCount = p.frameCount * 0.01;
    const uTime = uFrameCount;
    const polygonCount = p.abs(p.sin(uTime * 0.005) * 10.0) + 4.0;
    console.log(polygonCount);
    const uMouseX = p.map(p.mouseX, 0, p.width, 0, 1.0);
    const uMouseY = p.map(p.mouseY, 0, p.height, 0, 1.0);
    p.push();
    p.translate(0, 0, 0);
    const polygon = new Geometry.Polygon({
      p: p,
      size: p.width * 0.2,
      vertexNumber: polygonCount,
      segmentNumber: 100,
    });
    p.shader(mainShader);
    mainShader.setUniform("uResolution", [p.width, p.height]);
    mainShader.setUniform("uMouse", [uMouseX, uMouseY]);
    mainShader.setUniform("uTime", uTime);
    polygon.drawShader();
    p.pop();
  };

  p.draw = () => {
    p.orbitControl();
    p.background("rgba(0, 0, 0, 1.0)");

    drawMorphine();
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
