import P5 from "p5";
import { Line } from "./geometry/Line";
export type Move1 = {
  position1: P5.Vector;
  velocity1: P5.Vector;
};

export type Move2 = {
  position2: P5.Vector;
  velocity2: P5.Vector;
};

export class Mover {
  private p: P5;
  private move1: Move1;
  private move2: Move2;
  constructor(p: P5, move1: Move1, move2: Move2) {
    this.p = p;
    this.move1 = move1;
    this.move2 = move2;
  }

  update() {
    const value1 = this.p.floor(this.p.random(1, 10));
    const value2 = this.p.floor(this.p.random(1, 10));
    const frameCount1 = this.p.frameCount % value1;
    const frameCount2 = this.p.frameCount % value2;

    if (frameCount1 === 1) {
      this.move1.velocity1.y = 1;
      this.move1.position1.add(this.move1.velocity1);
    }

    if (frameCount2 === 1) {
      this.move2.velocity2.y = 1;
      this.move2.position2.add(this.move2.velocity2);
    }
  }

  draw(color: P5.Color) {
    const line = new Line(this.p, this.move1.position1, this.move2.position2);
    line.drawColor(color);
  }

  public isLineRemove(): boolean {
    return (
      this.move1.position1.y < this.p.height * 0.5 &&
      this.move2.position2.y < this.p.height * 0.5
    );
  }
}
