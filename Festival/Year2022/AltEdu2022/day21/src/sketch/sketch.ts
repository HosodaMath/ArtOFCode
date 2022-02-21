import * as P5 from "p5";
// import * as Eases from "eases";
import { Star } from "../geometry/geometry";
import { blueAirSketch } from "./blueAirSketch";
import { nightAirSketch } from "./nightAirSketch";
import BlueAirVertexShader from "../shader/blueAir.vert";
import BlueAirFragmentShader from "../shader/blueAir.frag";
import NightAirVertexShader from "../shader/nightAir.vert";
import NightAirFragmentShader from "../shader/nightAir.frag";
export const sketch = () => {
  const mainSketch = (p: P5) => {
    let blueAirCanvas: P5.Graphics;
    let blueAirShader: P5.Shader;
    let nightAirCanvas: P5.Graphics;
    let nightAirShader: P5.Shader;
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
      p.noStroke();
      p.pixelDensity(1);
      p.textureMode(p.NORMAL);

      // 夜の星空を描く
      nightAirCanvas = p.createGraphics(p.width, p.height, p.WEBGL);
      nightAirShader = nightAirCanvas.createShader(
        NightAirVertexShader,
        NightAirFragmentShader
      );

      nightAirSketch(nightAirCanvas, nightAirShader);

      // 昼の青空を描く
      blueAirCanvas = p.createGraphics(512, 512, p.WEBGL);
      blueAirShader = blueAirCanvas.createShader(
        BlueAirVertexShader,
        BlueAirFragmentShader
      );

      blueAirSketch(blueAirCanvas, blueAirShader);
    };

    p.draw = () => {
      p.background(0, 0, 0);

      // 夜の空
      p.push();
      p.translate(-p.width * 0.5, -p.height * 0.5, 0.0);
      p.image(nightAirCanvas, 0, 0);
      p.pop();

      // 夜の空にの様子の星を描く
      p.push();
      [...Array(10).keys()].forEach((count) => {
        const positionX = p.random(-p.width * 0.5, p.width * 0.5);
        const positionY = p.random(-p.height * 0.25, p.height * 0.25);
        p.translate(positionX, positionY, 0.0);
        Star.starTexture({
          p: p,
          size: p.height * 0.1,
          pricleNumber: 5,
          segmentNumber: 5,
          texture: blueAirCanvas,
        });
      });
      p.pop();

      p.noLoop();
    };
  };

  new P5(mainSketch);
};
