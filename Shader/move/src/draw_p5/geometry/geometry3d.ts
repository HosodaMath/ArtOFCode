import P5 from "p5";
export class Geometry3D {
  static plane = (
    p: P5,
    sizeX: number,
    sizeY: number,
    detailX: number,
    detailY: number
  ) => {
    let u: number, v: number;
    [...Array(detailY).keys()].forEach((i) => {
      v = i / detailY;
      [...Array(detailX).keys()].forEach((j) => {
        u = j / detailX;
      });
    });
  };

  static polygon = (
    p: P5,
    radius: number,
    vertex: number,
    segment: number = 360
  ) => {
    p.beginShape();
    [...Array(segment).keys()].forEach((theta) => {
      const x = radius * Math.cos(p.radians((360 * theta) / vertex));
      const y = radius * Math.sin(p.radians((360 * theta) / vertex));
      const z = 0;
      p.vertex(x, y, z);
    });
    p.endShape(p.CLOSE);
  };
}
