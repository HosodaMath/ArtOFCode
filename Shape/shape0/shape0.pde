void setup() {
  size(512, 512, P3D);
  noStroke();  
  // noLoop();
}

void draw() {
  background(0 ,0, 0);
  float dirX = (mouseX / float(width) - 0.5) * 2.0;
  float dirY = (mouseY / float(height) - 0.5) * 2.0;
  // println(dirX, dirY, -dirX, -dirY);
  // +だと操作が反転する
  directionalLight(204, 204, 204, -dirX, -dirY, -1);
  for(int count = 0; count < 5; count++){
    pushMatrix();
    translate(random(0, width),random(0, height), random(0, width) );
    Sphere(200, 200, 100);
    popMatrix();
  }
  saveFrame("data/#######.png");
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
