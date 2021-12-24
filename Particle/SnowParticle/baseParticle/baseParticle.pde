SnowParticleSystem snowParticle;
void setup() {
  fullScreen(P3D);
  // size(1024, 1024, P3D);
  snowParticle = new SnowParticleSystem();
}

void draw() {
  background(0, 0, 0);
  PVector mousePosition = new PVector(mouseX, mouseY);
  ambientLight(240, 240, 240);
  pointLight(255, 255, 255, mousePosition.x, mousePosition.y, 50);
  
  // ここでParticleの追加
  snowParticle.addParticleSystem();
  
  // ここでParticleの座標更新
  snowParticle.updateParticleSystem();
  
  // 風をコントロールする
  // snowParticle.windController();
}
