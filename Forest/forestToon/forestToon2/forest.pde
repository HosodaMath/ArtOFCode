void renderForest(
  PShader forestShader, 
  PShape forestShape, 
  float primitiveRotateY, 
  float uTime
){
  PVector forestPosition = new PVector(width * 0.5, height * 0.5, 0.0);
  float size = 80;
  float rotateX = -PI / 6;
  PVector scaleSize = new PVector(size, size, size);
  pushMatrix();
  translate(forestPosition.x, forestPosition.y, forestPosition.z);
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
