import P5 from "p5";
import RGBSplitCustomVertexShader from "./rgbSplitFrameCount.vert?raw";
import RGBSplitCustomFragmentShader from "./rgbSplitFrameCount.frag?raw";

export class RGBSplitFrameCountShader {
  static setRGBSplitShader = (p: P5) => {
    const shader = p.createShader(
      RGBSplitCustomVertexShader,
      RGBSplitCustomFragmentShader
    );

    return shader;
  };

  static renderRGBSplitShader = (p: P5, shader: P5.Shader, image: P5.Image) => {
    p.shader(shader);
    shader.setUniform("uTexture", image);
    shader.setUniform("uResolution", [p.width, p.height]);
    shader.setUniform("uFrameCount", p.frameCount);
    p.push();
    p.translate(-p.width / 2.0, -p.height / 2.0, 0.0);
    p.rect(0, 0, p.width, p.height);
    p.pop();
    p.resetShader();
  };
}
