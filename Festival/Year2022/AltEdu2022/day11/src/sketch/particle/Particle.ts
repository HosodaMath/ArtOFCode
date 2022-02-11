import P5 from "p5";
import { Vector3 } from "../../mathematics/Vector3";
export type DigitalText = "0" | "1";

export class Particle {
  private p: P5;
  private position: Vector3;
  private velocity: Vector3;
  private acceleration: Vector3;
  private mass: number;
  private text: DigitalText;
  constructor(p: P5, position: Vector3, mass: number, text: DigitalText) {
    this.p = p;
    this.position = position;
    this.velocity = new Vector3(0.0, 0.0, 0.0);
    this.acceleration = new Vector3(0.0, 0.0, 0.0);
    this.mass = mass;
    this.text = text;
  }

  public applyForce(force: Vector3) {
    const calcForce = Vector3.div(force, this.mass);
    this.acceleration.add(calcForce);
  }

  public update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0.0);
  }

  public draw() {
    this.p.push();
    this.p.fill(this.p.color(150, 255, 150, 255));
    this.p.translate(this.position.x, this.position.y, this.position.z);
    this.p.text(this.text, 0, 0);
    this.p.pop();
  }

  public isCheckEdge() {
    const width2 = this.p.width * 0.5;
    if (this.position.x < -width2) {
      this.position.x = -width2;
      this.velocity.x *= -1.0;
    } else if (this.position.x > width2) {
      this.position.x = width2;
      this.velocity.x *= -1.0;
    }

    /*
    const height2 = this.p.height * 0.5;
    if(this.position.y < -height2){
      this.position.y = -height2;
      this.velocity.y *= -1.0;
    } else if(this.position.y > height2){
      this.position.y = height2;
      this.velocity.y *= -1.0;
    }*/
  }

  public isRemove() {
    return this.position.y < this.p.height * 0.5;
  }
}
