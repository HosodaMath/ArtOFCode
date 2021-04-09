// NEORT and OpenProcessing
function setup() {
  createCanvas(1024, 1024);
  createCanvas(1024, 1024);
  gradient = createImage(width, height);
  gradient.loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let colors1 = color(
        random(100, 120),
        random(200, 250),
        noise(x * y * 0.01) * 250
      );
      let colors2 = color(
        random(100, 120),
        noise(x * y * 0.01) * 250,
        random(200, 250)
      );

      gradient.set(x, y / 2, colors1);
      gradient.set(x, y, colors2);
    }
  }
  gradient.updatePixels();
}

function draw() {
  image(gradient,0, 0);
}
