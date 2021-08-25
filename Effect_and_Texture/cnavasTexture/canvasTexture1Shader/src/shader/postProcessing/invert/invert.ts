import P5 from "p5";
import InvertVertexShader from "./invert.vert?raw";
import InvertFragmentShader from "./invert.frag?raw";

export class InvertShader {
  static setInvertShader = (p: P5) => {
    const shader = p.createShader(InvertVertexShader, InvertFragmentShader);

    return shader;
  };

  static renderInvertShader = (p: P5, shader: P5.Shader, image: P5.Image) => {
    p.shader(shader);
    shader.setUniform("uTexture", image);
    p.push();
    p.translate(-p.width / 2.0, -p.height / 2.0, 0.0);
    p.rect(0, 0, p.width, p.height);
    p.pop();
    p.resetShader();
  };
}