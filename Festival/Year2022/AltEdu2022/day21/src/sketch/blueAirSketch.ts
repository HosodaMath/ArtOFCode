import * as P5 from "p5";
export const blueAirSketch = (
  canvas: P5.Graphics,
  blueAirShader: P5.Shader
) => {
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
};
