import P5 from "p5";
export const rect = (p: P5, shapeSize: number) => {
  const fillColor = p.color("#000080");
  const shiftLocation = shapeSize * 0.5;
  p.push();
  p.fill(fillColor);
  p.translate(-shiftLocation, -shiftLocation, 0);
  p.rect(0, 0, shapeSize, shapeSize);
  p.pop();
};
