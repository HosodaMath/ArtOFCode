PShader star_filed;
void setup() {
  size(640, 640, P2D);
  noStroke();  
  star_filed = loadShader("shader/star.glsl");
}

void draw() {
  star_filed.set("resolution", float(width), float(height));
  star_filed.set("time", millis() * 0.0005);
  shader(star_filed);
  rect(0, 0, width, height);
}
