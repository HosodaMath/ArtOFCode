void canvasPlane(PShape canvas, float width, float height){
  float w = width / 2.0;
  float h = height / 2.0;
  canvas.beginShape();
  canvas.vertex(-w, h, 0);
  canvas.vertex(-w, -h, 0);
  canvas.vertex(w, -h, 0);
  canvas.vertex(w, h, 0);
  canvas.endShape(CLOSE);
} 

void canvasCircle(PShape canvas, float segment, float radius){
  canvas.beginShape();
  for(float count = 0; count < segment; count++){
    float r = ((PI * 2.0) / segment) * count;
    float rx = cos(r);
    float ry = sin(r);
    canvas.vertex(rx * radius, ry * radius, 0);
  }
  canvas.endShape(CLOSE);
}

void canvasSphere(PShape canvas, float row, float column, float radius){
  canvas.beginShape();
  for(float i = 0; i < row; i++){
    float r = PI / row * i;
    float ry = cos(r);
    float rr = sin(r);
    for(float j = 0; j < column; j++){
      float tr = PI * 2 / column * j;
      float tx = rr * radius * cos(tr);
      float ty = ry * radius;
      float tz = rr * radius * sin(tr);
      canvas.vertex(tx, ty, tz);
    }
  }
  canvas.endShape(CLOSE);
}