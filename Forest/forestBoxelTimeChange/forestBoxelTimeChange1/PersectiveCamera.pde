void drawPersectiveCamera(PVector mouse){
  float cameraY = height / 2.0;
  float fov = mouse.y / float(width) * PI / 2.0;
  float cameraZ = cameraY / tan(fov / 2.0);
  float aspect = float(width)  / float(height);

  float zNear = cameraZ / 10.0;
  float zFar = cameraZ * 10.0;
  pushMatrix();
  perspective(fov, aspect, zNear, zFar);
  popMatrix();
}