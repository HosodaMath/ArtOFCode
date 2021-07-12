import * as P5 from "p5";
import * as Vector from "./math/vector";
import * as Satellite from "./satelite";
import * as Color from "./color/color";
import "sanitize.css";
import "./main.css";

const start_button = document.querySelector("#start_button");
if (!start_button) {
  throw new Error("Error");
}

start_button.addEventListener("click", async () => {
  const overlay = document.querySelector("#overlay");
  if (!overlay) {
    throw new Error("Error");
  }
  overlay.remove();
  const element = document.body;
  element.requestFullscreen();

  const sketch = (p: P5) => {
    const MAX = 10;
    let width2: number, height2: number, depth2: number;
    let width4: number, height4: number, depth4: number;

    let satellite: Satellite.Satellite[] = [];
    let sateliteBodyColor: Color.colorRGB[] = [];
    let sateliteWingColor: Color.colorRGB[] = [];
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.noStroke();
      setBaseCoordinate();
      setSatellite();
    };

    /**
     * 基本座標の設定
     */
    const setBaseCoordinate = () => {
      width2 = p.width * 0.5;
      height2 = p.height * 0.5;
      depth2 = width2;
      width4 = width2 * 0.5;
      height4 = height2 * 0.5;
      depth4 = depth2 * 0.5;
    };

    const setSatellite = () => {
      [...Array(MAX).keys()].forEach((count) => {
        const position = new Vector.Vector3(
          p.cos(count) * height2,
          p.sin(count) * height2,
          -depth2
        );
        const velocity = new Vector.Vector3(0, 0, 1);

        const initSatellite = new Satellite.Satellite(p, position, velocity);
        satellite.push(initSatellite);

        const bodyColor: Color.colorRGB = {
          r: p.random(150, 250),
          g: p.random(150, 250),
          b: 150,
        };
        sateliteBodyColor.push(bodyColor);

        const wingColor: Color.colorRGB = {
          r: 100,
          g: p.random(0, 230),
          b: p.random(0, 250),
        };
        sateliteWingColor.push(wingColor);
      });
    };

    p.draw = () => {
      // p.orbitControl();
      //p.camera(0, 0, 0);
      p.background("rgba(0, 0, 0, 0.0)");
      p.ambientLight(200, 200, 200);
      p.pointLight(230, 230, 230, 0, -p.height * 0.5, p.width * 0.5);

      [...Array(10).keys()].forEach((count) => {
        p.push();
        p.rotateX(p.frameCount * 0.01 * (count + 1) * 0.05);
        p.rotateY(p.frameCount * 0.025 * (count + 1) * 0.01);
        // satellite[count].satelliteUpdate();
        satellite[count].createSatellite(
          sateliteBodyColor[count],
          sateliteWingColor[count]
        );
        p.pop();
      });
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
});
