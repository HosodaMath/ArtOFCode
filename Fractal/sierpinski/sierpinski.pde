PGraphics canvas;
PImage noiseTexture;
PShader textureShader;
PShader rgbSplit;
float deltaTime = 0;
void setup() {
  size(1024, 1024, P3D);
  noStroke();
  // stroke(240, 248, 255);
  frameRate(30);

  noiseTexture = loadImage("./assets/image/noise.png");


  rgbSplit = loadShader(
    "./postProcessing/rgbSplit/rgbSplit.frag", 
    "./postProcessing/rgbSplit/rgbSplit.vert"
  );
  
  canvas = createGraphics(1024, 1024, P3D);
  canvas.noStroke();
  canvas.textureMode(NORMAL);
  
  textureShader = canvas.loadShader(
    "./assets/shader/texture/Oritatami.frag", 
    "./assets/shader/texture/Oritatami.vert"
  );
}

void draw() {
  background(0, 0, 0);
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;
  float polygonVertex = 3;
  int polygonSegments = 3;
  // directionalLight(240, 240, 240, 1, 2, -3);
  canvas.beginDraw();
  canvas.background(240, 240, 200);
  canvas.shader(textureShader);
  textureShader.set("uResolution", float(canvas.width), float(canvas.height));
  textureShader.set("uTime", uTime);
  textureShader.set("uTexture", noiseTexture);
  canvas.pushMatrix();
  canvas.translate(canvas.width / 2.0, canvas.height / 2.0);
  canvas.rotate(radians(90));
  //rotateZ(deltaTime);
  canvasSierpinski(canvas, width * 0.1, 10, deltaTime, polygonVertex, polygonSegments);
  canvas.popMatrix();
  canvas.endDraw();
  
  deltaTime += 0.1;
  
  shader(rgbSplit);
  rgbSplit.set("uResolution", float(width), float(height));
  rgbSplit.set("uTexture", canvas);
  pushMatrix();
  translate(0, 0, 0);
  image(canvas, 0, 0);
  popMatrix();

  saveFrame("frames/#######.png");
  
}





void keyPressed() {
  String captureSpace = "_";
  if (key == 's') {
    saveFrame("capture/" + "capture_" + 
      minute() + captureSpace + 
      second() + captureSpace + 
      millis() + ".png");
  }
}
