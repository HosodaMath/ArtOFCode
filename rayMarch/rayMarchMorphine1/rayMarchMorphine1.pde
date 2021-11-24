PShader mainShader;
void setup() {
  size(1024, 1024, P3D);
  noStroke();

  mainShader = loadShader(
    "shader/texture/rayMarching1.frag", 
    "shader/texture/rayMarching1.vert"
  );
}

void draw() {
  float uFrameCount = frameCount;
  float uTime = uFrameCount * 0.05;
  background(0, 0, 0);
  pushMatrix();
  shader(mainShader);
  mainShader.set("uResolution",float(width), float(height));
  mainShader.set("uTime", uTime);
  rect(0, 0, width, height);
  popMatrix();

  saveFrame("./frames/raymarch#####.png");
}

