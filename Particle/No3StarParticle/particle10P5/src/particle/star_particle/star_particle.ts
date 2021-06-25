import * as P5 from "p5";
import * as Vector from "../../vector/vector2";
/**
 * @description 開発中
 * StarParticle
 * 星形Particle
 * @todo そのまま出力 -> 😌
 * @todo scaleなどの変換行列を活用する -> 😌
 * @todo 様々な場所から出力する -> 😌
 * @todo Night -> 😌
 */
export class StarParticle {
  public position: Vector.Vector2;
  public velocity: Vector.Vector2;
  public acceleration: Vector.Vector2;
  public radius: number;
  public prickle: number;
  public p: P5;
  /**
   *
   * @param p
   * @param position
   * @param velocity
   * @param acceleration
   * @param radius
   * @param prickle
   */
  constructor(
    p: P5,
    position: Vector.Vector2,
    velocity: Vector.Vector2,
    acceleration: Vector.Vector2,
    radius: number,
    prickle: number
  ) {
    this.p = p;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.radius = radius;
    this.prickle = prickle;
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
    const vertexNumber = this.prickle * 2;
    this.p.push();
    this.p.translate(this.position.x, this.position.y);
    this.p.rotate(-90);
    this.p.scale(this.p.cos(this.position.x), this.p.sin(this.position.y));
    this.p.beginShape();
    [...Array(vertexNumber).keys()].forEach((count) => {
      if (count % 2 == 0) {
        scale_size = this.radius / 2.0;
      } else {
        scale_size = this.radius;
      }
      this.p.vertex(
        scale_size * this.p.cos((360 * count) / vertexNumber),
        scale_size * this.p.sin((360 * count) / vertexNumber)
      );
    });
    this.p.endShape(this.p.CLOSE);
    this.p.pop();
  };
}
