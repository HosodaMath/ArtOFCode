import P5 from "p5";
import RGBSplitMouseVertexShader from "./rgbSplitMouse.vert?raw";
import RGBSplitMouseFragmentShader from "./rgbSplitMouse.frag?raw";

export class RGBSplitMouseShader {
  static setRGBSplitShader = (p: P5) => {
    const shader = p.createShader(
      RGBSplitMouseVertexShader,
      RGBSplitMouseFragmentShader
    );

    return shader;
  };

  static renderRGBSplitShader = (p: P5, shader: P5.Shader, image: P5.Image) => {
    const mousePosX = p.map(p.mouseX, 0.0, p.width, 0.0, 10.0);
    const mousePosY = p.map(p.mouseY, 0.0, p.height, 0.0, 10.0);
    p.shader(shader);
    shader.setUniform("uTexture", image);
    shader.setUniform("uResolution", [p.width, p.height]);
    shader.setUniform("uMouse", [mousePosX, mousePosY]);
    p.push();
    p.translate(-p.width / 2.0, -p.height / 2.0, 0.0);
    p.rect(0, 0, p.width, p.height);
    p.pop();
    p.resetShader();
  };
}
