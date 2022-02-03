import P5 from "p5";
export class GameObject {
  protected p: P5;
  protected velocity: P5.Vector;
  public position: P5.Vector;
  constructor(p: P5, position: P5.Vector, velocity: P5.Vector) {
    this.p = p;
    this.position = position;
    this.velocity = velocity;
  }

  update(): void {
    this.position.add(this.velocity);
  }
}
