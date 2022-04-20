/*
  ToonShaderらしい😳
  オリジナルのシェイプのみで描画する🤗 -> 難しい😔
 */

PShader toon;
void setup() {
  size(620, 460, P3D);
  // fullScreen(P3D);
  noStroke();

  toon = loadShader("toon.frag", "toon.vert");
}

void draw() {
  //noStroke();
  background(252, 255, 209);
  toon.set("uFrameCount", frameCount * 0.001);
  shader(toon);
  float dirX = (mouseX / float(width) - 0.5) * 2.0;
  float dirY = (mouseY / float(height) - 0.5) * 2.0;
  // println(dirX, dirY, -dirX, -dirY);
  // +だと操作が反転する
  directionalLight(204, 204, 204, -dirX, -dirY, -1);
  
  pushMatrix();
  translate(width / 2.0, height / 2.0, 5);
  // Sphere(100, 100, 150);
  sphere(150);
  popMatrix();
  resetShader();


  // saveFrame("########.png");
}
