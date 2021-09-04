import P5 from "p5";

import "sanitize.css";
import "./style.css";

const sketch = (p: P5) => {
  const boxMax = 100;
  let canvas: P5.Graphics;
  let locationBox: P5.Vector[] = [];
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();

    initBoxLocation();

    canvas = p.createGraphics(800, 800, p.P2D);
    canvas.noStroke();
  };

  const initBoxLocation = () => {
    [...Array(boxMax).keys()].forEach((_count) => {
      locationBox.push(
        p.createVector(
          p.random(-p.width / 2.0, p.width / 2.0),
          p.random(-p.height / 2.0, p.height / 2.0),
          p.random(-p.width / 2.0, p.width / 2.0)
        )
      );
    });
  };

  const mainRendering = (uTime: number) => {
    const drawing = canvas.drawingContext.canvas.getContext("2d");
    if (!drawing) {
      throw new Error("not found canvas element");
    }
    const COLOR_PALLET = [
      `rgba(100, 100, ${canvas.abs(canvas.cos(uTime)) * 200}, 1.0)`,
      `rgba(120, 120, ${canvas.abs(canvas.cos(uTime)) * 210}, 0.9)`,
      `rgba(140, 140, ${canvas.abs(canvas.cos(uTime)) * 220}, 0.8)`,
      `rgba(160, 160, ${canvas.abs(canvas.cos(uTime)) * 230}, 0.7)`,
      `rgba(180, 180, ${canvas.abs(canvas.cos(uTime)) * 240}, 0.6)`,
    ];

    const gradation = drawing.createLinearGradient(
      canvas.width / 2.0,
      0.0,
      canvas.width / 2.0,
      canvas.height
    );

    gradation.addColorStop(0.0, COLOR_PALLET[0]);
    gradation.addColorStop(0.2, COLOR_PALLET[1]);
    gradation.addColorStop(0.4, COLOR_PALLET[2]);
    gradation.addColorStop(0.6, COLOR_PALLET[3]);
    gradation.addColorStop(1.0, COLOR_PALLET[4]);
    drawing.save();
    drawing.shadowBlur = 10;
    drawing.shadowColor = "rgba(240, 240, 200, 1.0)";
    drawing.fillStyle = gradation;
    canvas.rect(0, 0, 800, 800);
    drawing.restore();
    p.texture(canvas);
    [...Array(locationBox.length).keys()].forEach((count) => {
      p.push();
      p.translate(
        locationBox[count].x,
        locationBox[count].y,
        locationBox[count].z
      );
      p.rotateX(uTime * (count * 0.2));
      p.rotateY(uTime * (count * 0.1));
      p.box(80, 80, 80, 200, 200);
      p.pop();
    });
  };

  p.draw = () => {
    p.orbitControl();
    p.background(0, 0, 0);
    const uFrameCount = p.frameCount * 0.005;
    const uTime = uFrameCount;
    mainRendering(uTime);
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
