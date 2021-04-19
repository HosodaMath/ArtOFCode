PVector position1;
PVector position2;
void setup() {
  size(1024, 1024);
  // fullScreen();
  //noStroke();

  position1 = new PVector(width / 4.0, height / 2.0);
  position2 = new PVector(width - width / 4.0, height / 2.0);
}

void draw() {
  background(0, 0, 0);
  float k = 7.0 / 2.0;
  drawFlower1(100, k , color(250, 250, 150));
  drawFlower2(100, color(250, 250, 150));
}

void drawFlower1(float radius, float k, color fillColor) {
  fill(fillColor);
  stroke(color(250, 250, 250));
  pushMatrix();
  translate(position1.x, position1.y);
  beginShape();
  for(float theta = 0; theta < 2 * TWO_PI; theta += 0.005){
    float r = radius * sin(k * theta);
    float x = r * cos(theta);
    float y = r * sin(theta);
    vertex(x, y);
  }
  endShape(CLOSE);
  popMatrix();
}

void drawFlower2(float radius, color fillColor){
  fill(fillColor);
  stroke(color(250, 250, 250));
  pushMatrix();
  translate(position2.x, position2.y);
  beginShape();
  for(float theta = 0; theta < 2 * TWO_PI; theta += 0.005){
    float r = radius * abs(sin(theta * 5)) + radius / 2.0;
    float x = r * cos(theta);
    float y = r * sin(theta);
    curveVertex(x, y);
  }
  endShape(CLOSE);
  popMatrix();
}
