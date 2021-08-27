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

  drawRGBSplit = (shader: P5.Shader) => {
    const uFrameCount = this.p.frameCount * 0.005;
    const uTime = uFrameCount;

    this.p.shader(shader);
    shader.setUniform("uResolution", [this.p.width, this.p.height]);
    shader.setUniform("uTime", uTime);
    shader.setUniform("uTexture1", this.texture[0]);
    shader.setUniform("uTexture2", this.texture[1]);
    shader.setUniform("uTexture3", this.texture[2]);
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

  drawMirror = (shader: P5.Shader) => {
    const uFrameCount = this.p.frameCount * 0.005;
    const uTime = uFrameCount;

    this.p.shader(shader);
    shader.setUniform("uResolution", [this.p.width, this.p.height]);
    shader.setUniform("uTime", uTime);
    shader.setUniform("uTexture1", this.texture[0]);
    shader.setUniform("uTexture2", this.texture[1]);
    shader.setUniform("uTexture3", this.texture[2]);
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

  drawSinWave = (shader: P5.Shader) => {
    const uFrameCount = this.p.frameCount * 0.005;
    const uTime = uFrameCount;
    const uFrequency = this.p.map(this.p.mouseX, 0, this.p.width, 0, 10.0);
    const uAmplitude = this.p.map(this.p.mouseY, 0, this.p.height, 0, 0.25);

    this.p.shader(shader);
    shader.setUniform("uResolution", [this.p.width, this.p.height]);
    shader.setUniform("uTime", uTime);
    shader.setUniform("uFrequency", uFrequency);
    shader.setUniform("uAmplitude", uAmplitude);
    shader.setUniform("uTexture1", this.texture[0]);
    shader.setUniform("uTexture2", this.texture[1]);
    shader.setUniform("uTexture3", this.texture[2]);
    this.p.push();
    this.p.translate(
      this.drawLocation.x,
      this.drawLocation.y,
      this.drawLocation.z
    );
    this.p.box(500, 500, 500, 200, 200);
    // this.p.sphere(200, 200, 200);
    this.p.pop();
    this.p.resetShader();
  };

  drawCosWave = (shader: P5.Shader) => {
    const uFrameCount = this.p.frameCount * 0.005;
    const uTime = uFrameCount;
    const uFrequency = this.p.map(this.p.mouseX, 0, this.p.width, 0, 10.0);
    const uAmplitude = this.p.map(this.p.mouseY, 0, this.p.height, 0, 0.25);

    this.p.shader(shader);
    shader.setUniform("uResolution", [this.p.width, this.p.height]);
    shader.setUniform("uTime", uTime);
    shader.setUniform("uFrequency", uFrequency);
    shader.setUniform("uAmplitude", uAmplitude);
    shader.setUniform("uTexture1", this.texture[0]);
    shader.setUniform("uTexture2", this.texture[1]);
    shader.setUniform("uTexture3", this.texture[2]);
    this.p.push();
    this.p.translate(
      this.drawLocation.x,
      this.drawLocation.y,
      this.drawLocation.z
    );
    this.p.box(500, 500, 500, 200, 200);
    // this.p.sphere(200, 200, 200);
    this.p.pop();
    this.p.resetShader();
  };

  drawSingleBlur = (shader: P5.Shader) => {
    const uFrameCount = this.p.frameCount * 0.005;
    const uTime = uFrameCount;

    this.p.shader(shader);
    shader.setUniform("uResolution", [this.p.width, this.p.height]);
    shader.setUniform("uTime", uTime);
    shader.setUniform("uTexelSize", [1.0 / this.p.width, 1.0 / this.p.height]);
    shader.setUniform("uTexture1", this.texture[0]);
    shader.setUniform("uTexture2", this.texture[1]);
    shader.setUniform("uTexture3", this.texture[2]);
    this.p.push();
    this.p.translate(
      this.drawLocation.x,
      this.drawLocation.y,
      this.drawLocation.z
    );
    this.p.box(500, 500, 500, 200, 200);
    // this.p.sphere(200, 200, 200);
    this.p.pop();
    this.p.resetShader();
  };
}
