void drawCamera(PVector mouse){
  float eyeY = map(mouse.y , 0, height, -200, 0);
  PVector eye = new PVector(0, eyeY, 0 + (height / 2.0) / tan(180 * 30.0 / 180.0));
  PVector center = new PVector(0, 0, 0);
  PVector up = new PVector(0, 1, 0);
  camera(
    eye.x, eye.y, eye.z, 
    center.x, center.y, center.z, 
    up.x, up.y, up.z
  );
}