// 必ず0から1の間の数値を返す。
// カッコ内の変数によってなめらかに変化する度合いが異なる。
import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(1000, 1000);
    p.colorMode("HSB", 360.0, 100.0, 100.0, 100.0);
    p.noLoop();
    p.noStroke();
    p.angleMode(p.DEGREES);
  };

  let renderTriangle = (x: number, y: number, r: number) => {
    p.push();
    p.translate(x, y);
    p.rotate(-90);
    p.beginShape();
    for (let count = 0; count < 3; count++) {
      p.vertex(p.cos((360 * count) / 3) * r, p.sin((360 * count) / 3) * r);
    }
    p.endShape(p.CLOSE);
    p.pop();
  };

  p.draw = () => {
    p.background(220, 220, 250);
    const SIZE = 5;
    p.push();
    p.translate(p.width * 0.5, p.height * 0.5);
    p.beginShape();
    for (let x = -p.width / 2; x < p.width / 2; x += SIZE) {
      for (let y = -p.height / 2; y < p.height / 2; y += SIZE) {
        p.fill(p.noise(x * y * 0.01) * 360.0, 80.0, 90.0, 100.0);
        renderTriangle(x, y, SIZE);
      }
    }
    p.endShape();
    p.pop();
  };
};

new p5(sketch);
