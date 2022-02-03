import P5 from "p5";
import { GameObject } from "./GameObject";
export class Bean extends GameObject {
  /**
   * 
   * @param p 
   * @param position 
   * @param velocity 
   */
  constructor(p: P5, position: P5.Vector, velocity: P5.Vector) {
    super(p, position, velocity);
  }

  /**
   * @description 更新
   */
  public  update(): void {
    this.position.add(this.velocity);
  }

  /**
   * @description 描画
   */
  public draw(): void {
    const size = 20;
    const shiftY = size * 0.5;
    this.p.push();
    this.p.translate(this.position.x, this.position.y);
    this.p.fill("#d4b48c");
    this.p.ellipse(0, 0, size, size);
    this.p.ellipse(0, shiftY, size, size);
    this.p.pop();
  }

  /**
   * @description 画面外かどうか判定する
   * @returns 
   */
  public isBeanRemove(): boolean{
    return this.p.height > this.position.y;
  }
}
