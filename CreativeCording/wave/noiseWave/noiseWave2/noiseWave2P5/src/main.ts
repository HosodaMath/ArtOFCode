import p5 from "p5";

const sketch = (p: p5) => {
  let cutoff_z: number = 0.0;
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.noStroke();
    p.frameRate(60);
  };

  let drawNoiseWave = () => {
    p.push();
    // let time: number = Date.now() * 0.001;
    let cutoff_x: number = 0.0;
    let cutoff_y: number = 0.0;
    for (let x = (-1 * p.width) / 2.0; x < p.width / 2.0; x += 100) {
      for (let y = (-1 * p.height) / 2.0; y < p.height / 2.0; y += 100) {
        let z: number = p.map(
          p.noise(cutoff_x, cutoff_y, cutoff_z),
          0,
          1,
          200,
          300
        );
        p.push();
        p.translate(x, y, z);
        p.box(100);
        cutoff_x += 0.05;
        cutoff_y += 0.05;
        p.pop();
      }
    }
    cutoff_z += 0.01;
    p.pop();
  };

  p.draw = () => {
    p.background(0, 0, 0);
    p.pointLight(40, 250, 250, 0, 0, 400);
    drawNoiseWave();
  };
};

new p5(sketch);
