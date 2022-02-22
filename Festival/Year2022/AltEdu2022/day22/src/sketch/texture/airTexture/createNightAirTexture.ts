import * as P5 from "p5";
import NightAirVertexShader from "../../../shader/nightAir.vert";
import NightAirFragmentShader from "../../../shader/nightAir.frag";
export const createNightAirTexture = (
  p: P5,
  textureSize: [number, number]
): P5.Graphics => {
  // 青空を描く
  const canvas = p.createGraphics(textureSize[0], textureSize[1], p.WEBGL);
  canvas.textureMode(canvas.NORMAL);
  const nightAirShader = canvas.createShader(
    NightAirVertexShader,
    NightAirFragmentShader
  );
  const uFrameCount = 0.0;
  const uTime = uFrameCount;
  canvas.push();
  canvas.shader(nightAirShader);
  nightAirShader.setUniform("uResolution", [canvas.width, canvas.height]);
  nightAirShader.setUniform("uTime", uTime);
  canvas.translate(-canvas.width * 0.5, -canvas.height * 0.5, 0);
  canvas.rect(0, 0, canvas.width, canvas.height);
  canvas.resetShader();
  canvas.pop();

  return canvas;
};
