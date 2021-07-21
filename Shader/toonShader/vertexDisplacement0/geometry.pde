void Plane(float width, float height){
  float w = width / 2.0;
  float h = height / 2.0;
  beginShape();
  vertex(-w, h, 0);
  vertex(-w, -h, 0);
  vertex(w, -h, 0);
  vertex(w, h, 0);
  endShape(CLOSE);
} 

void Circle(float segment, float radius){
  beginShape();
  for(float count = 0; count < segment; count++){
    float r = ((PI * 2.0) / segment) * count;
    float rx = cos(r);
    float ry = sin(r);
    vertex(rx * radius, ry * radius, 0);
  }
  endShape(CLOSE);
}

void Sphere(float row, float column, float radius){
  fill(255, 255, 255);
  beginShape();
  for(float i = 0; i < row; i++){
    float r = PI / row * i;
    float ry = cos(r);
    float rr = sin(r);
    for(float j = 0; j < column; j++){
      float tr = PI * 2 / column * j;
      float tx = rr * radius * cos(tr);
      float ty = ry * radius;
      float tz = rr * radius * sin(tr);
      vertex(tx, ty, tz);
    }
  }
  endShape(CLOSE);
}


