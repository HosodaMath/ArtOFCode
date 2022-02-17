import P5 from "p5";
export const triangle = (p: P5, shapeSize: number) => {
  const fillColor = p.color("#7fffd4");
  const shiftLocation = shapeSize * 0.5;
  p.push();
  p.fill(fillColor);
  p.translate(0, 0, 0);
  p.beginShape();
  p.vertex(-shapeSize + shiftLocation, shapeSize - shiftLocation, 0);
  p.vertex(0, -shapeSize + shiftLocation, 0);
  p.vertex(shapeSize - shiftLocation, shapeSize - shiftLocation, 0);
  p.endShape(p.CLOSE);
  p.pop();
}