import P5 from "p5";
export class Circle {
  private p: P5;
  private position: P5.Vector;
  private size: P5.Vector;
  constructor(p: P5, position: P5.Vector, size: P5.Vector) {
    this.p = p;
    this.position = position;
    this.size = size;
  }

  update() {
    this.size.add(this.p.random(-0.5, 0.5));
  }

  drawFill(fillColor: P5.Color) {
    this.p.push();
    this.p.translate(this.position.x, this.position.y, 0.0);
    this.p.smooth();
    this.p.fill(fillColor);
    this.p.ellipse(0, 0, this.size.x, this.size.y);
    this.p.pop();
  }

  drawShader(shader: P5.Shader) {
    this.p.push();
    this.p.translate(this.position.x, this.position.y, 0.0);
    this.p.shader(shader);
    shader.setUniform("uResolution", [this.p.width, this.p.height]);
    shader.setUniform("uTime", this.p.frameCount * 0.01);
    this.p.smooth();
    this.p.ellipse(0, 0, this.size.x, this.size.y);
    this.p.resetShader();
    this.p.pop();
  }
}
