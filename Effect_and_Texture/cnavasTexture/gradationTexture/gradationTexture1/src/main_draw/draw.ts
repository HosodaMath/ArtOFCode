import P5 from "p5";

export class DrawShader {
  private p: P5;
  private texture: P5.Graphics[] | P5.Image[] | (P5.Graphics | P5.Image)[];
  private drawLocation: P5.Vector;
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
    drawLocation: P5.Vector
  ) {
    this.p = p;
    this.texture = textrue;
    this.drawLocation = drawLocation;
  }

  drawShader = (shader: P5.Shader) => {
    const uFrameCount = this.p.frameCount * 0.005;
    const uTime = uFrameCount;

    this.p.shader(shader);
    shader.setUniform("uResolution", [this.p.width, this.p.height]);
    shader.setUniform("uTime", uTime);
    shader.setUniform("uTexture1", this.texture[0]);
    shader.setUniform("uTexture2", this.texture[1]);
    this.p.push();
    this.p.translate(
      this.drawLocation.x,
      this.drawLocation.y,
      this.drawLocation.z
    );
    this.p.rect(0, 0, this.p.width, this.p.height);
    this.p.pop();
    this.p.resetShader();
  };
}
