import P5 from "p5";
import { Mover, Move1, Move2 } from "./Mover";
export class Movers {
  private p: P5;
  private movers: Mover[];
  constructor(p: P5) {
    this.p = p;
    this.movers = [];
  }

  private addLine() {
    const initPosition1X = this.p.random(
      -this.p.width * 0.5,
      this.p.width * 0.5
    );

    const initPosition1Y = 0;

    const position1 = this.p.createVector(initPosition1X, initPosition1Y);
    const velocity1 = this.p.createVector(0, 0);
    const move1: Move1 = { position1: position1, velocity1: velocity1 };

    const initPosition2X = this.p.random(
      -this.p.width * 0.5,
      this.p.width * 0.5
    );

    const initPosition2Y = 0;

    const position2 = this.p.createVector(initPosition2X, initPosition2Y);
    const velocity2 = this.p.createVector(0, 0);
    const move2: Move2 = { position2: position2, velocity2: velocity2 };

    const mover = new Mover(this.p, move1, move2);
    this.movers.push(mover);
  }

  public update() {
    if (this.p.frameCount % 120 === 1) {
      this.addLine();
    }

    for (const line of this.movers) {
      line.update();
    }

    this.movers = this.movers.filter((line) => line.isLineRemove());
  }

  public draw() {
    for (const line of this.movers) {
      line.draw(this.p.color("#ffa500"));
    }
  }
}
