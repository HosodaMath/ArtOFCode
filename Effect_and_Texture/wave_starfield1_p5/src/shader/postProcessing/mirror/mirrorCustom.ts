import P5 from "p5";
import MirrorVertexShader from "./mirrorCustom.vert?raw";
import MirrorFragmentShader from "./mirrorCustom.frag?raw";

export class MirrorCustomShader {
  static setMirrorShader = (p: P5) => {
    const shader = p.createShader(MirrorVertexShader, MirrorFragmentShader);

    return shader;
  };

  static renderMirrorShader = (p: P5, shader: P5.Shader, image: P5.Image) => {
    const uTime = Date.now() * 0.005;
    p.shader(shader);
    shader.setUniform("uTexture", image);
    shader.setUniform("uTime", uTime);
    // shader.setUniform("uResolution", [p.width, p.height]);
    p.push();
    p.translate(-p.width / 2.0, -p.height / 2.0, 0.0);
    p.rect(0, 0, p.width, p.height);
    p.pop();
    p.resetShader();
  };
}
