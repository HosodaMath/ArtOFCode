import * as P5 from "p5";
import * as Vector from "../../vector/vector2";
/**
 * @description 開発中
 * RhombusParticle
 * ひし形Particle
 * @todo そのまま出力 -> x
 * @todo scaleなどの変換行列を活用する
 */
export class RhombusParticle {
  public position: Vector.Vector2;
  public velocity: Vector.Vector2;
  public acceleration: Vector.Vector2;
  public radius: number;
  public p: P5;
  /**
   *
   * @param p
   * @param position
   * @param velocity
   * @param radius
   */
  constructor(
    p: P5,
    position: Vector.Vector2,
    velocity: Vector.Vector2,
    acceleration: Vector.Vector2,
    radius: number
  ) {
    this.p = p;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.radius = radius;
  }

  /**
   *
   * @param flag 跳ね返りがあるもしくは跳ね返りがないを選択 default: true
   */
  updateParticle = (flag: boolean = true) => {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    if (flag == true) {
      if (this.position.x < 0 || this.position.x > this.p.width) {
        this.velocity.x *= -1;
      }

      if (this.position.y < 0 || this.position.y > this.p.height) {
        this.velocity.y *= -1;
      }
    }
  };

  /**
   * @param customNumberX x軸軌道変更用の数 default: 0
   * @param customNumberY y軸軌道変更用の数 default: 0
   */
  updateParticleCustom = (
    customNumberX: number = 0,
    customNumberY: number = 0
  ) => {
    this.position.x += this.velocity.x + customNumberX;
    this.position.y += this.velocity.y + customNumberY;
  };

  drawParticle = (fillColor: string, strokeColor: string) => {
    this.p.strokeWeight(2.0);
    this.p.stroke(strokeColor);
    this.p.fill(fillColor);
    let scale_size: number;
    this.p.push();
    this.p.translate(this.position.x, this.position.y);
    this.p.beginShape();
    [...Array(4).keys()].forEach((count) => {
      if (count % 2 == 0) {
        scale_size = this.radius / 2.0;
      } else {
        scale_size = this.radius;
      }
      this.p.vertex(
        scale_size * this.p.cos(90 * count),
        scale_size * this.p.sin(90 * count)
      );
    });
    this.p.endShape();
    this.p.pop();
  };
}
