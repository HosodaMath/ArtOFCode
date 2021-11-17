void renderStage(
  PShader stageShader, 
  PShape stageShape, 
  float primitiveRotateY,
  float uTime
){
  PVector stagePosition = new PVector(width * 0.5, height - height * 0.25, 0.0);
  float size = 80;
  float rotateX = 0;
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
