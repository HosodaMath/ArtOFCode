/*
  ToonShaderらしい😌
 */

PShader toon;
float maxDistance;
void setup() {
  // size(620, 460, P3D);
  fullScreen(P3D);
  noStroke();
  toon = loadShader("toon.frag", "toon.vert");

  maxDistance = dist(0, 0, width, height);
}

void draw() {
  //noStroke();
  background(0, 0, 0);
  shader(toon);

  float dirX = (mouseX / float(width) - 0.5) * 2.0;
  float dirY = (mouseY / float(height) - 0.5) * 2.0;
  // println(dirX, dirY, -dirX, -dirY);
  // +だと操作が反転する
  directionalLight(204, 204, 204, -dirX, -dirY, -1);
  for(int x = 0; x < width; x+= 50){
    for(int y = 0; y < height; y+= 50){
      float size = dist(mouseX, mouseY, x, y);
      pushMatrix();
      translate(x, y, 0);
      size = size / maxDistance * 50;
      sphere(size);
      popMatrix();
    }
  }
}
