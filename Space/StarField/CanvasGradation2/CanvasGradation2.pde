/*
  コードを改良する
*/
PShader star1;
PShader star2;
PShader star3;
PShader star4;
PGraphics canvas1;
PGraphics canvas2;
PGraphics canvas3;
PGraphics canvas4;
void setup() {
  //size(620, 460, P3D);
  fullScreen(P3D);
  canvas1 = createGraphics(width / 2, height / 2, P3D);
  star1 = loadShader("gradation1.frag");  

  canvas2 = createGraphics(width / 2, height / 2, P3D);
  star2 = loadShader("gradation2.frag");  

  canvas3 = createGraphics(width / 2, height / 2, P3D);
  star3 = loadShader("gradation2.frag");  

  canvas4 = createGraphics(width / 2, height / 2, P3D);
  star4 = loadShader("gradation1.frag");  
  
  noStroke();
}

void DrawCanvas1(){
  star1.set("resolution", float(width / 2), float(height / 2));
  star1.set("time", millis() * 0.0005);
  star1.set("vFrameCount", frameCount * 0.005);

  canvas1.beginDraw();
  canvas1.noStroke();
  canvas1.background(0, 0, 0);
  canvas1.shader(star1);
  pushMatrix();
  canvas1.translate(0, 0, 0);
  canvas1.rotateX(frameCount * 0.01);
  canvas1.fill(100, 200, 250);
  canvas1.rect(0, 0, width / 2, height / 2);
  popMatrix();
  canvas1.endDraw();

  image(canvas1, 0, 0, width / 2, height / 2);
}

void DrawCanvas2(){
  star2.set("resolution", float(width / 2), float(height / 2));
  star2.set("time", millis() * 0.0005);
  star2.set("vFrameCount", frameCount * 0.005);

  canvas2.beginDraw();
  canvas2.noStroke();
  canvas2.background(0, 0, 0);
  canvas2.shader(star2);
  pushMatrix();
  canvas2.translate(0, 0, 0);
  canvas2.rotateX(frameCount * 0.009);
  canvas2.fill(100, 200, 250);
  canvas2.rect(0, 0, width / 2, height / 2);
  popMatrix();
  canvas2.endDraw();

  image(canvas2, width / 2, 0, width / 2, height / 2);
}

void DrawCanvas3(){
  star3.set("resolution", float(width / 2), float(height / 2));
  star3.set("time", millis() * 0.0005);
  star3.set("vFrameCount", frameCount * 0.005);

  canvas3.beginDraw();
  canvas3.noStroke();
  canvas3.background(0, 0, 0);
  canvas3.shader(star3);
  pushMatrix();
  canvas3.translate(0, 0, 0);
  canvas3.rotateX(frameCount * 0.007);
  canvas3.fill(100, 200, 250);
  canvas3.rect(0, 0, width / 2, height / 2);
  popMatrix();
  canvas3.endDraw();

  image(canvas3, 0, height / 2, width / 2, height / 2);
}

void DrawCanvas4(){
  star4.set("resolution", float(width / 2), float(height / 2));
  star4.set("time", millis() * 0.0005);
  star4.set("vFrameCount", frameCount * 0.005);

  canvas4.beginDraw();
  canvas4.noStroke();
  canvas4.background(0, 0, 0);
  canvas4.shader(star4);
  pushMatrix();
  canvas4.translate(0, 0, 0);
  canvas4.rotateX(frameCount * 0.005);
  canvas4.fill(100, 200, 250);
  canvas4.rect(0, 0, width / 2, height / 2);
  popMatrix();
  canvas4.endDraw();

  image(canvas4, width / 2, height / 2, width / 2, height / 2);
}

void draw() {
  DrawCanvas1();
  DrawCanvas2();
  DrawCanvas3();
  DrawCanvas4();
}
