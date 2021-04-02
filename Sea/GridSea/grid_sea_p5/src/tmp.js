/// openProcessing and NEORT
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  stroke(150, 250, 150);
  frameRate(60);
}

function draw() {
  background("#ffffff");
  let size = width * 0.1;
  push();
  pointLight(255, 255, 255, 0, 0, 0);
  ambientLight(25, 200, 200);
  ambientMaterial(25, 200, 200);
  for (let x = -width; x < width; x += size) {
    for (let y = -height; y < height; y += size) {
      push();
      translate(x, y, -200);
      rotateX(millis() * 0.001);
      box(size);
      pop();
    }
  }
  pop();
}
