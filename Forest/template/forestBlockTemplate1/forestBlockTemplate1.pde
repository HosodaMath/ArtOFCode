// 地面のパラメーター
PShape stageShape;
PShader stageShader;

// 森のパラメーター
PShape forestShape;
PShader forestShader;

// 空のパラメーター
PShader waterShader1;

void setup() {
  size(1024, 1024, P3D);
  noStroke();
  
  textureMode(NORMAL);
  
  stageShape = loadShape("./assets/model/base2.obj");
  stageShader = loadShader(
    "shader/custom/stage/stage.frag", 
    "shader/custom/stage/stage.vert"
  );
  
  forestShader = loadShader(
    "shader/custom/forest/forest.frag", 
    "shader/custom/forest/forest.vert"
  );
  forestShape = loadShape("./assets/model/forest1.obj");
  
  waterShader1 = loadShader(
    "./shader/texture/water/waterStarField1.frag", 
    "./shader/texture/water/waterStarField1.vert"
  );
}



void renderStage(float primitiveRotateY, float uTime) {
  PVector stagePosition = new PVector(width / 2.0, height - height / 4.0, 0.0);
  float size = 80;
  float rotateX = -PI / 6;
  PVector scaleSize = new PVector(size, size, size);
  pushMatrix();
  translate(stagePosition.x, stagePosition.y, stagePosition.z);
  scale(scaleSize.x, scaleSize.y, scaleSize.z);
  rotateX(rotateX);
  rotateY(primitiveRotateY);
  rotateZ(PI);
  shader(stageShader);
  stageShader.set("uResolution", float(width), float(height));
  stageShader.set("uTime", uTime);
  shape(stageShape, 0, 0);
  resetShader();
  popMatrix();
}

void renderAir(float primitiveRotateY, float uTime) {
  PVector spherePosition = new PVector(width * 0.5, height * 0.5, 0.0);
  PVector sphereScale = new PVector(2.0, 2.0, 2.0);
  float rotateX = -PI / 6;
  float sphereSize = 1000;
  pushMatrix();
  translate(spherePosition.x, spherePosition.y, spherePosition.z);
  rotateX(rotateX);
  rotateY(primitiveRotateY);
  scale(sphereScale.x, sphereScale.y, sphereScale.z);
  shader(waterShader1);
  waterShader1.set("uResolution", float(width), float(height));
  waterShader1.set("uTime", uTime);
  sphere(sphereSize);
  popMatrix();
  resetShader();
}

void renderMainForest(float primitiveRotateY, float uTime) {
  PVector stagePosition = new PVector(width / 2.0, height - height / 4.0, 0.0);
  float size = 80;
  float rotateX = -PI / 6;
  PVector scaleSize = new PVector(size, size, size);
  pushMatrix();
  translate(stagePosition.x, stagePosition.y, stagePosition.z);
  scale(scaleSize.x, scaleSize.y, scaleSize.z);
  rotateX(rotateX);
  rotateY(primitiveRotateY);
  rotateZ(PI);
  shader(forestShader);
  forestShader.set("uResolution", float(width), float(height));
  forestShader.set("uTime", uTime);
  shape(forestShape, 0, 0);
  resetShader();
  popMatrix();
}
void draw() {
  float uFrameCount = frameCount;
  float uTime = uFrameCount * 0.01;
  
  PVector mousePos = new PVector(mouseX, mouseY);
  float primitiveRotateY = PI / 3.0 + mousePos.x / float(width) * PI;
  
  background(0, 0, 0);
  directionalLight(255, 255, 255, 1, 2, -3);
  
  drawPersectiveCamera(mousePos);
  //drawCamera(mousePos);

  renderStage(primitiveRotateY, uTime);
  renderAir(primitiveRotateY, uTime);
  renderMainForest(primitiveRotateY, uTime);
  
  saveFrame("frames/######.png");
}
