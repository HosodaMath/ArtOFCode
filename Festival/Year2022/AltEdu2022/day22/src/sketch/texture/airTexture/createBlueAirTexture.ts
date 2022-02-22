import * as P5 from "p5";
import BlueAirVertexShader from "../../../shader/blueAir.vert";
import BlueAirFragmentShader from "../../../shader/blueAir.frag";
export const createBlueAirTexture = (p: P5): P5.Graphics => {
  let canvas: P5.Graphics;
  let blueAirShader: P5.Shader;
  // 青空を描く
  canvas = p.createGraphics(512, 512, p.WEBGL);
  canvas.textureMode(canvas.NORMAL);
  blueAirShader = canvas.createShader(
    BlueAirVertexShader,
    BlueAirFragmentShader
  );
  const uFrameCount = 0.0;
  const uTime = uFrameCount;
  canvas.push();
  canvas.shader(blueAirShader);
  blueAirShader.setUniform("uResolution", [canvas.width, canvas.height]);
  blueAirShader.setUniform("uTime", uTime);
  canvas.translate(-canvas.width * 0.5, -canvas.height * 0.5, 0);
  canvas.rect(0, 0, canvas.width, canvas.height);
  canvas.resetShader();
  canvas.pop();

  return canvas;
};
