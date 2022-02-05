import P5 from "p5";
export class Line {
  private p: P5;
  private position1: P5.Vector;
  private position2: P5.Vector;
  constructor(p: P5, position1: P5.Vector, position2: P5.Vector) {
    this.p = p;
    this.position1 = position1;
    this.position2 = position2;
  }

  drawColor(strokeColor: P5.Color) {
    this.p.push();
    this.p.stroke(strokeColor);
    this.p.beginShape();
    this.p.vertex(this.position1.x, this.position1.y, 0);
    this.p.vertex(this.position2.x, this.position2.y, 0);
    this.p.endShape();
    this.p.pop();
  }

  drawShader(shader: P5.Shader) {
    this.p.push();
    this.p.shader(shader);
    this.p.beginShape();
    this.p.vertex(this.position1.x, this.position1.y, 0);
    this.p.vertex(this.position2.x, this.position2.y, 0);
    this.p.endShape();
    this.p.pop();
  }
}
