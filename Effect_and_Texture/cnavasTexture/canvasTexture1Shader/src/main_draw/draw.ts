import P5 from "p5";

export class DrawShader {
  private p: P5;
  private texture: P5.Graphics[] | P5.Image[] | (P5.Graphics | P5.Image)[];
  private drawLocation: P5.Vector;
  private drawVelocity: P5.Vector;
  /**
   *
   * @param p
   * @param textrue
   * @param drawLocation
   * @param drawVelocity
   */
  constructor(
    p: P5,
    textrue: P5.Graphics[] | P5.Image[] | (P5.Graphics | P5.Image)[],
    drawLocation: P5.Vector,
    drawVelocity: P5.Vector
  ) {
    this.p = p;
    this.texture = textrue;
    this.drawLocation = drawLocation;
    this.drawVelocity = drawVelocity;
  }

  /*
  製作途中
  update = () => {
    this.drawLocation.add(this.drawVelocity);
  };
  */

  draw = (shader: P5.Shader) => {
    this.p.shader(shader);
    shader.setUniform("uTexture1", this.texture[0]);
    this.p.push();
    this.p.translate(
      this.drawLocation.x,
      this.drawLocation.y,
      this.drawLocation.z
    );
    this.p.box(500, 500, 500, 200, 200);
    this.p.pop();
    this.p.resetShader();
  };

  drawMulti = (shader: P5.Shader) => {
    this.p.shader(shader);
    shader.setUniform("uTexture1", this.texture[0]);
    shader.setUniform("uTexture2", this.texture[1]);
    this.p.push();
    this.p.translate(
      this.drawLocation.x,
      this.drawLocation.y,
      this.drawLocation.z
    );
    this.p.box(500, 500, 500, 200, 200);
    this.p.pop();
    this.p.resetShader();
  };
}
