import P5 from "p5";
import SinWaveDistortVertexShader from "./sinWaveDistort.vert?raw";
import SinWaveDistortFragmentShader from "./sinWaveDistort.frag?raw";

export class SinWaveDistortShader {
  static setSinWaveDistortShader = (p: P5) => {
    const shader = p.createShader(
      SinWaveDistortVertexShader,
      SinWaveDistortFragmentShader
    );

    return shader;
  };

  static renderSinWaveDistortShader = (
    p: P5,
    shader: P5.Shader,
    image: P5.Image
  ) => {
    const uTime = Date.now() * 0.005;
    const uFrequency = p.map(p.mouseX, 0.0, p.width, 0.0, 10.0);
    const uAmplitude = p.map(p.mouseY, 0.0, p.height, 0.0, 0.25);

    p.shader(shader);
    shader.setUniform("uTexture", image);
    // shader.setUniform("uResolution", [p.width, p.height]);
    shader.setUniform("uTime", uTime);
    shader.setUniform("uFrequency", uFrequency);
    shader.setUniform("uAmplitude", uAmplitude);
    p.push();
    p.translate(-p.width / 2.0, -p.height / 2.0, 0.0);
    p.rect(0, 0, p.width, p.height);
    p.pop();
    p.resetShader();
  };
}
