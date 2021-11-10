void renderStage(PShader stageShader, PShape stageShape, float primitiveRotateY){
  PVector stagePosition = new PVector(width * 0.5, height * 0.5, 0.0);
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
  shape(stageShape, 0, 0);
  resetShader();
  popMatrix();
}
