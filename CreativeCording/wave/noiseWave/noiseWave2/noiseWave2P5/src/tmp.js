let cutoff_z = 0.0;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  frameRate(60);
}

function drawNoiseWave() {
  push();
  // let time: number = Date.now() * 0.001;
  let cutoff_x = 0.0;
  let cutoff_y = 0.0;
  for (let x = (-1 * width) / 2.0; x < width / 2.0; x += 100) {
    for (let y = (-1 * height) / 2.0; y < height / 2.0; y += 100) {
      let z = map(noise(cutoff_x, cutoff_y, cutoff_z), 0, 1, 200, 300);
      push();
      translate(x, y, z);
      box(100);
      cutoff_x += 0.05;
      cutoff_y += 0.05;
      pop();
    }
  }
  cutoff_z += 0.01;
  pop();
}

function draw() {
  background(0, 0, 0);
  pointLight(40, 250, 250, 0, 0, 400);
  drawNoiseWave();
}
