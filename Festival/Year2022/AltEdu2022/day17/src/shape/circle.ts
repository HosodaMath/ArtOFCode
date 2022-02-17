import P5 from "p5";
export const circle = (p: P5, shapeSize: number) => {
  const fillColor = p.color("#ff8c00");
  p.push();
  p.fill(fillColor);
  p.translate(0, 0, 0);
  p.circle(0, 0, shapeSize);
  p.pop();
};
