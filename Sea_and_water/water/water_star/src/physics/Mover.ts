import * as P5 from "p5";
export class Mover {
  private p: P5;
  private position: P5.Vector;
  private acceleration: P5.Vector;
  private size: number;
  public velocity: P5.Vector;
  public mass: number;
  /**
   *
   * @param position 任意の座標を入れる
   * @param mass 任意の質量を入れる
   */
  constructor(p: P5, position: P5.Vector, mass: number) {
    this.p = p;
    this.position = position;
    this.velocity = this.p.createVector(0, 0, 0);
    this.acceleration = this.p.createVector(0, 0, 0);
    this.mass = mass;
    this.size = mass * 10.0;
  }

  /**
   * 物体に加わる力と加速度を求める。
   * @param force 重力や風力、水力などの値が入る。
   */
  force(force: P5.Vector): void {
    // 質量とforce
    const f = P5.Vector.div(force, this.mass);

    this.acceleration.add(f);
  }

  /**
   * 加速度から速度
   * 速度から座標を求める
   */
  update(): void {
    // 速度に加速度を加える。
    this.velocity.add(this.acceleration);
    // 速度から座標を求める。
    this.position.add(this.velocity);
    // 加速度を0にする
    this.acceleration.mult(0);
  }

  /**
   *
   */
  isCheckEdge(): void {
    if (this.position.x > this.p.width / 2.0 - this.size / 2.0) {
      this.position.x = this.p.width / 2.0 - this.size / 2.0;
      this.velocity.x *= -1;
    } else if (this.position.x < -this.p.width / 2.0 + this.size / 2.0) {
      this.position.x = -this.p.width / 2.0 + this.size / 2.0;
      this.velocity.x *= -1;
    }

    if (this.position.y > this.p.height / 2.0 - this.size / 2.0) {
      this.position.y = this.p.height / 2.0 - this.size / 2.0;
      this.velocity.y *= -1;
    } else if (this.position.y < -this.p.height / 2.0 + this.size / 2.0) {
      this.position.y = -this.p.height / 2.0 + this.size / 2.0;
      this.velocity.y *= -1;
    }
  }

  isContactEdge(): boolean {
    return this.position.y > this.p.height / 2.0 - this.size - 1;
  }

  render(): void {
    const r = 200;
    const g = 200;
    const b = 100;
    const alpha = 255;
    //this.p.fill(r, g, b);
    this.p.specularMaterial(r, g, b, alpha);
    this.p.shininess(50);
    this.p.push();
    this.p.translate(this.position.x, this.position.y, this.position.z);
    // this.p.ellipse(0, 0, this.size, this.size);
    this.p.sphere(this.size);
    this.p.pop();
  }
}
