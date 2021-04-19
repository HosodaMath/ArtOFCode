PVector position1;
Flower flower1;
void setup() {
  // size(1024, 1024);
  fullScreen(P3D);
  //frameRate(60);
  position1 = new PVector(width / 2.0, height / 2.0);
  float k = 7.0 / 2.0;
  flower1 = new Flower(100, k);
}

void draw() {
  background(0, 0, 0);
  
  pushMatrix();
  translate(position1.x, position1.y);
  flower1.drawFlower1(color(250, 250, 150));
  popMatrix();
}