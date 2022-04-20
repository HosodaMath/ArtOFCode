PShader mainShader;
void setup() {
  size(1024, 1024, P3D);
  noStroke();

  mainShader = loadShader(
    "fbmColorPalette2.frag", 
    "fbmColorPalette2.vert"
  );
}

void draw() {
  background(0, 0, 0);

  float uFrameCount = frameCount;
  float uTime = uFrameCount * 0.05;
  pushMatrix();
  shader(mainShader);
  mainShader.set("uResolution", float(width), float(height));
  mainShader.set("uTime", uTime);
  translate(0, 0, 0);
  rect(0, 0, width, height);
  resetShader();
  popMatrix();

  saveFrame("capture/########.png");
}
