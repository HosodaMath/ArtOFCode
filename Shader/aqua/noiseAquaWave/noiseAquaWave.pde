PShader shader;
void setup() {
  fullScreen(P2D);
  shader = loadShader("noiseAquaWave.glsl");
  noCursor();
}

void draw() {
  shader.set("time", millis() / 1000.0);
  shader.set("resolution", (float)width, (float)height);
  shader(shader);
  rect(0, 0, width, height);
}
