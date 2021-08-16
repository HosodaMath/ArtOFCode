import P5 from "p5";
export class StarGeometry3D {
  private p: P5;
  private radius: number;
  private prickle_num: number;
  private segment: number;
  constructor(
    p: P5,
    radius: number,
    prickle_num: number,
    segment: number = 360
  ) {
    this.p = p;
    this.radius = radius;
    this.prickle_num = prickle_num;
    this.segment = segment;
  }

  draw = () => {
    const vertexNumber = this.prickle_num * 2;
    const segmentNumber = this.segment * 2;
    this.p.beginShape();
    [...Array(segmentNumber).keys()].forEach((theta) => {
      const size = theta % 2 === 0 ? this.radius / 2.0 : this.radius;
      this.p.vertex(
        size * Math.cos(this.p.radians((360 * theta) / vertexNumber)),
        size * Math.sin(this.p.radians((360 * theta) / vertexNumber)),
        0
      );
    });
    this.p.endShape(this.p.CLOSE);
  };

  drawNoise = (noise_x: number, noise_y: number) => {
    const vertexNumber = this.prickle_num * 2;
    const segmentNumber = this.segment * 2;
    this.p.beginShape();
    [...Array(segmentNumber).keys()].forEach((theta) => {
      const size = theta % 2 === 0 ? this.radius / 2.0 : this.radius;
      this.p.vertex(
        size * Math.cos(this.p.radians((360 * theta) / vertexNumber) * noise_x),
        size * Math.sin(this.p.radians((360 * theta) / vertexNumber) * noise_y),
        0
      );
    });
    this.p.endShape(this.p.CLOSE);
  };
}
