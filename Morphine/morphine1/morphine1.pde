PGraphics canvas;
PShader mainShader;
void setup() {
  size(1024, 1024, P3D);
  //size(512, 512, P3D);
  noStroke();
  frameRate(30);
  
  canvas = createGraphics(width, height, P3D);
  canvas. textureMode(NORMAL);
  mainShader = canvas.loadShader(
    "./shader/texture/Morphine/Morphine1Geometry.frag", 
    "./shader/texture/Morphine/Morphine1Geometry.vert"
  );
}

void createPolygon() {
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;
  float polygonCount = abs(sin(uTime * 0.005) * 10.0) + 4.0;
  float uMouseX = map(mouseX, 0, canvas.width, 0, 1.0);
  float uMouseY = map(mouseY, 0, canvas.height, 0, 1.0);
  canvas.beginDraw();
  canvas.background(0, 0, 0);
  canvas.noStroke();
  canvas.pushMatrix();
  canvas.translate(canvas.width / 2.0, canvas.height / 2.0);
  canvas.shader(mainShader);
  mainShader.set("uResolution", float(width), float(height));
  mainShader.set("uMouse", uMouseX, uMouseY);
  mainShader.set("uTime", uTime);
  canvasPolygon(canvas, canvas.width * 0.5, polygonCount, 100);
  canvas.popMatrix();
  canvas.endDraw();

}

void draw() {
  background(0, 0, 0);
  createPolygon();

  pushMatrix();
  translate(0, 0, 0);
  image(canvas, 0, 0);
  popMatrix();

  saveFrame("frames/#######.png");
}
