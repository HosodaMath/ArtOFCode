PShader shader;
void setup() {
  // size(1024, 1024, P2D);
  fullScreen(P2D);
  shader = loadShader("fbm1dColor1.glsl");

}

void draw() {
  shader.set("time", millis() / 1000.0);
  shader.set("resolution", (float)width, (float)height);
  shader(shader);
  rect(0, 0, width, height);
}
