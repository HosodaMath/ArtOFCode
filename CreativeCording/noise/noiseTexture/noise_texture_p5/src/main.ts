import p5 from "p5";

const sketch = (p: p5) => {
  let gradient: p5.Image;
  p.setup = () => {
    p.createCanvas(1024, 1024);
    gradient = p.createImage(p.width, p.height);
    gradient.loadPixels();
    for (let x = 0; x < p.width; x++) {
      for (let y = 0; y < p.height; y++) {
        let colors1 = p.color(
          p.random(100, 120),
          p.random(200, 250),
          p.noise(x * y * 0.01) * 250
        );
        let colors2 = p.color(
          p.random(100, 120),
          p.noise(x * y * 0.01) * 250,
          p.random(200, 250)
        );

        gradient.set(x, y / 2, colors1);
        gradient.set(x, y, colors2);
      }
    }
    //p.set(0, 0, gradient);
    gradient.updatePixels();
  };

  p.draw = () => {
    p.image(gradient,0, 0);
  };
};

new p5(sketch);
