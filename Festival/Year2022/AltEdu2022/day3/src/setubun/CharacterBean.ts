import P5 from "p5";
import { Bean } from "./Bean";
export class CharacterBean extends Bean {
  private characterSize: number;
  /**
   * 
   * @param p 
   * @param position 
   * @param velocity 
   * @param characterSize 
   */
  constructor(
    p: P5,
    position: P5.Vector,
    velocity: P5.Vector,
    characterSize: number
  ) {
    super(p, position, velocity);
    this.characterSize = characterSize;
  }

  /**
   * @description 重力を加える
   */
  public applyGravity(): void {
    const gravity = 0.15;
    this.velocity.y += gravity;
  }

  /**
   * @description ジャンプを加える
   */
  public applyJump(): void {
    const jump = -5;
    this.velocity.y = jump;
  }

  /**
   * @description 描画
   */
  public draw() {
    const size = this.characterSize;
    const shiftY = size * 0.5;
    this.p.push();
    this.p.translate(this.position.x, this.position.y);
    this.p.fill("#d4b48c");
    this.p.ellipse(0, 0, size, size);
    this.p.ellipse(0, shiftY, size, size);
    this.p.pop();
  }

  /**
   * @description 画面外に出ているかどうかの判定
   * @returns 
   */
  public isBeanRemove(): boolean {
    return this.position.y < this.p.height;
  }
}
