import P5 from "p5";
import MirrorStarVertexShader from "./mirrorStar.vert?raw";
import MirrorStarFragmentShader from "./mirrorStar.frag?raw";

export class MirrorStarShader {
  static setMirrorStarShader = (p: P5) => {
    const shader = p.createShader(MirrorStarVertexShader, MirrorStarFragmentShader);

    return shader;
  };

  static renderMirrorStarShader = (p: P5, shader: P5.Shader, image: P5.Image) => {
    const uFrameCount = p.frameCount * 0.05;
    const uTime = uFrameCount;
    p.shader(shader);
    shader.setUniform("uTexture", image);
    shader.setUniform("uTime", uTime);
    shader.setUniform("uResolution", [p.width, p.height]);
    p.push();
    p.translate(-p.width / 2.0, -p.height / 2.0, 0.0);
    p.rect(0, 0, p.width, p.height);
    p.pop();
    p.resetShader();
  };
}
