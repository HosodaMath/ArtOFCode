// 地面のパラメーター
PShape stageShape;
PShader stageShader;

// 森のパラメーター
PShape forestShape;
PShader forestShader1;
PShader forestShader2;

// 空のパラメーター
PShader waterStarFieldShader1;
PShader waterStarFieldShader2;

void setup() {
  size(1024, 1024, P3D);
  noStroke();

  textureMode(NORMAL);

  stageShape = loadShape("./assets/model/base2.obj");
  stageShader = loadShader(
    "shader/custom/stage/stage.frag",
    "shader/custom/stage/stage.vert"
    );

  forestShader1 = loadShader(
    "shader/custom/forest/forest1.frag",
    "shader/custom/forest/forest1.vert"
    );

  forestShader2 = loadShader(
    "shader/custom/forest/forest2.frag",
    "shader/custom/forest/forest2.vert"
    );

  forestShape = loadShape("./assets/model/forest1.obj");

  waterStarFieldShader1 = loadShader(
    "./shader/texture/water/waterStarField1.frag",
    "./shader/texture/water/waterStarField1.vert"
  );

  waterStarFieldShader2 = loadShader(
    "./shader/texture/water/waterStarField2.frag",
    "./shader/texture/water/waterStarField2.vert"
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
  if (uTime <= 5.0) {
    pushMatrix();
    translate(spherePosition.x, spherePosition.y, spherePosition.z);
    rotateX(rotateX);
    rotateY(primitiveRotateY);
    scale(sphereScale.x, sphereScale.y, sphereScale.z);
    shader(waterStarFieldShader1);
    waterStarFieldShader1.set("uResolution", float(width), float(height));
    waterStarFieldShader1.set("uTime", uTime);
    sphere(sphereSize);
    popMatrix();
    resetShader();
  } else {
    pushMatrix();
    translate(spherePosition.x, spherePosition.y, spherePosition.z);
    rotateX(rotateX);
    rotateY(primitiveRotateY);
    scale(sphereScale.x, sphereScale.y, sphereScale.z);
    shader(waterStarFieldShader2);
    waterStarFieldShader2.set("uResolution", float(width), float(height));
    waterStarFieldShader2.set("uTime", uTime);
    sphere(sphereSize);
    popMatrix();
    resetShader();
  }
}

void renderMainForest(float primitiveRotateY, float uTime) {
  PVector stagePosition = new PVector(width / 2.0, height - height / 4.0, 0.0);
  float size = 80;
  float rotateX = -PI / 6;
  PVector scaleSize = new PVector(size, size, size);
  if (uTime <= 5.0) {
    pushMatrix();
    translate(stagePosition.x, stagePosition.y, stagePosition.z);
    scale(scaleSize.x, scaleSize.y, scaleSize.z);
    rotateX(rotateX);
    rotateY(primitiveRotateY);
    rotateZ(PI);
    shader(forestShader1);
    forestShader1.set("uResolution", float(width), float(height));
    forestShader1.set("uTime", uTime);
    shape(forestShape, 0, 0);
    resetShader();
    popMatrix();
  } else {
    pushMatrix();
    translate(stagePosition.x, stagePosition.y, stagePosition.z);
    scale(scaleSize.x, scaleSize.y, scaleSize.z);
    rotateX(rotateX);
    rotateY(primitiveRotateY);
    rotateZ(PI);
    shader(forestShader2);
    forestShader2.set("uResolution", float(width), float(height));
    forestShader2.set("uTime", uTime);
    shape(forestShape, 0, 0);
    resetShader();
    popMatrix();
  }
}
void draw() {
  float uFrameCount = frameCount;
  float uTime = uFrameCount * 0.01;
  // println(uTime);
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
