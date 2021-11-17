void renderAir(
  PShader airShader, 
  float primitiveRotateY, 
  float uTime
) {
  PVector spherePosition = new PVector(width * 0.5, height * 0.5, 0.0);
  PVector sphereScale = new PVector(2.0, 2.0, 2.0);
  float rotateX = -PI / 6;
  float sphereSize = 1500;
  pushMatrix();
  translate(spherePosition.x, spherePosition.y, spherePosition.z);
  rotateX(rotateX);
  rotateY(primitiveRotateY);
  scale(sphereScale.x, sphereScale.y, sphereScale.z);
  shader(airShader);
  airShader.set("uResolution", float(width), float(height));
  airShader.set("uTime", uTime);
  sphere(sphereSize);
  popMatrix();
  resetShader();
}