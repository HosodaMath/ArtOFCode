void canvasSierpinski(
  PGraphics canvas,
  float triangleSize, 
  float level, 
  float time,
  float polygonVertex,
  int polygonSegments
  ) {
  if (level > 0) {
    canvasPolygon(canvas, triangleSize, polygonVertex, polygonSegments);
    canvas.pushMatrix();
    canvas.rotate(radians(60));
    for (int count = 0; count < 3; count++) {
      canvas.pushMatrix();
      canvas.translate(2 * triangleSize, 0);
      // canvas.rotate(time);
      canvas.rotate(PI);
      canvasSierpinski(canvas, triangleSize / 2.0, level - 1.0, time, polygonVertex, polygonSegments);
      canvas.popMatrix();
      canvas.rotate(radians(120));
    }
    canvas.popMatrix();
  }
}