void canvasPolygon(
  PGraphics canvas, 
  float polygonSize, 
  float vertexNumber, 
  int segmentNumber
  ) {
  canvas.beginShape();
  //texture(noiseTexture);
  for (int theta = 0; theta < segmentNumber; theta++) {
    float radianX = cos(radians(360 * theta) / vertexNumber);
    float radianY = sin(radians(360 * theta) / vertexNumber);
    float radianZ = 0;
    float x = radianX * polygonSize;
    float y = radianY * polygonSize;
    float z = radianZ * polygonSize;
    float u = 0.5 + radianX / 2.0;
    float v = 0.5 + radianY / 2.0;
    canvas.vertex(x, y, z, u, v);
  }
  canvas.endShape(CLOSE);
}
