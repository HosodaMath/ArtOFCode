/*
  ToonShaderらしい😳
 */

PShader star;
PShader toon;
PGraphics canvas;
void setup() {
  size(620, 460, P3D);
  // fullScreen(P3D);
  noStroke();
  star = loadShader("gradation.frag");
  canvas = createGraphics(width, height, P3D);
  
  toon = loadShader("toon.frag", "toon.vert");
}

void drawStarField(){
  star.set("resolution", float(width), float(height));
  star.set("time", millis() * 0.0005);
  star.set("vFrameCount", frameCount * 0.005);

  canvas.beginDraw();
  canvas.noStroke();
  canvas.background(0, 0, 0);
  canvas.shader(star);
  pushMatrix();
  canvas.translate(0, 0, 0);
  canvas.fill(100, 200, 250);
  canvas.rect(0, 0, width, height);
  popMatrix();
  canvas.endDraw();

  image(canvas, 0, 0, width, height);

  resetShader();
}

void draw() {
  //noStroke();
  // background(252, 255, 209);
  
  drawStarField();

  shader(toon);

  float dirX = (mouseX / float(width) - 0.5) * 2.0;
  float dirY = (mouseY / float(height) - 0.5) * 2.0;
  // println(dirX, dirY, -dirX, -dirY);
  // +だと操作が反転する
  directionalLight(204, 204, 204, -dirX, -dirY, -1);
  
  pushMatrix();
  for(int count = 0; count < 10; count++){
    pushMatrix();
    translate(width / 2.0, height / 2.0, 100.0);
    sphere(20);
    popMatrix();
  }
  popMatrix();

  resetShader();

  saveFrame("#######.png");
}
