PShader waterShader;
void setup() {
  size(1024, 1024, P3D);
  noStroke();

  waterShader = loadShader(
    "./shader/texture/water/water1.frag", 
    "./shader/texture/water/water1.vert"
  );
}

void draw() {
  background(0, 0, 0);

  float uFrameCount = frameCount;
  float uTime = uFrameCount * 0.01;

  pushMatrix();
  translate(0, 0, 0);
  shader(waterShader);
  waterShader.set("uResolution", float(width), float(height));
  waterShader.set("uTime", uTime);
  rect(0, 0, width, height);
  popMatrix();

  saveFrame("frames/water######.png");
}

