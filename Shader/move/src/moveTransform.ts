import P5 from "p5";
import * as Draw from "./draw_p5/draw_p5";
export class MoveTransform {
  private p: P5;
  public location1: Draw.Vector3;
  public targetX: number;
  public targetY: number;
  public anim: number;
  /**
   *
   * @param p
   */
  constructor(p: P5) {
    this.p = p;
    this.location1 = new Draw.Vector3(0.0, 0.0, 0.0);
    this.targetX = 0;
    this.targetY = 0;
    this.anim = 0;
  }

  /**
   *
   * @param deltaTime
   * @param time
   */
  update = (deltaTime: number, time: number) => {
    // なめらかに座標移動
    let k = 10.0;
    this.location1.x = Draw.Calc.lerp(
      this.targetX,
      this.location1.x,
      this.p.exp(-k * deltaTime)
    );
    this.location1.y = Draw.Calc.lerp(
      this.targetY,
      this.location1.y,
      this.p.exp(-k * deltaTime)
    );

    // なめらかに回転
    time += 1.0 / 60.0;
    this.anim = 1.0 - this.p.exp(-10.0 * time);
  };

  /**
   *
   * @param shader
   * @param image
   */
  render = (shader: P5.Shader, image: P5.Image) => {
    this.p.shader(shader);
    shader.setUniform("uTexture", image);
    shader.setUniform("uFrameCount", this.p.frameCount * 0.5);
    this.p.push();
    this.p.translate(this.location1.x, this.location1.y, this.location1.z);
    [...Array(360).keys()].forEach((theta) => {
      if (theta % 30 === 0) {
        this.p.push();
        this.p.translate(
          200.0 * this.p.cos(this.p.radians(theta) * this.p.frameCount * 0.005),
          100.0 * this.p.sin(this.p.radians(theta)),
          100.0 * this.p.tan(this.p.radians(theta))
        );
        this.p.rotateX(0.5 * this.anim);
        this.p.rotateY(this.anim );
        // this.p.sphere(100, 200, 200);
        // this.p.plane(200, 200, 200, 200);
        this.p.ellipse(0, 0, 100, 100);
        this.p.pop();
      }
    });
    this.p.pop();
    this.p.resetShader();
  };
}
