void createKochCurve(PVector initPointA, PVector initPointB){
  PVector pointA = initPointA;
  PVector pointB = initPointB;
  kochCanvas.beginDraw();
  kochCanvas.background(0, 0, 0);
  kochCanvas.stroke(240, 240, 190);
  kochCanvas.fill(240, 250, 250);
  kochCanvas.pushMatrix();
  kochCanvas.translate(0, 0, 0);
  kochCanvas.beginShape();
  kochCanvas.vertex(pointA.x, pointA.y , 0);
  kochCurve(kochCanvas, 5, pointA, pointB);
  kochCanvas.vertex(pointB.x, pointB.y , 0);
  kochCanvas.endShape();
  kochCanvas.popMatrix();
  kochCanvas.endDraw();
}

void kochCurve(PGraphics canvas, float d, PVector pointA, PVector pointB){
  PVector s = new PVector(0, 0);
  PVector t = new PVector(0, 0);
  PVector u = new PVector(0, 0);
  float theta = radians(60);
  if(d == 0){
    return;
  }

  s.x = (2.0 * pointA.x + 1.0 * pointB.x) / 3.0;
  s.y = (2.0 * pointA.y + 1.0 * pointB.y) / 3.0;
  t.x = (1.0 * pointA.x + 2.0 * pointB.x) / 3.0;
  t.y = (1.0 * pointA.y + 2.0 * pointB.y) / 3.0;
  u.x = (t.x - s.x) * cos(theta) - (t.y - s.y) * sin(theta) + s.x;
  u.y = (t.x - s.x) * sin(theta) + (t.y - s.y) * cos(theta) + s.y;
  kochCurve(canvas, d - 1, pointA, s);
  canvas.vertex(s.x, s.y, 0.0);
  kochCurve(canvas,d - 1, s, u);
  canvas.vertex(u.x, u.y, 0.0);
  kochCurve(canvas,d - 1, u, t);
  canvas.vertex(t.x, t.y ,0.0);
  kochCurve(canvas,d - 1,t, pointB);
}