PShader shader;
void setup() {
  fullScreen(P2D);
  shader = loadShader("random2.glsl");

}

void draw() {
  shader.set("time", millis() / 1000.0);
  shader.set("resolution", (float)width, (float)height);
  shader(shader);
  rect(0, 0, width, height);
}
