PGraphics canvas;
PShader textureSahder;
PShader mainShader;
PImage noiseImage;
PImage plantsImage;
float deltaTime;
void setup() {
  size(1024, 1024, P3D);
  noStroke();
  frameRate(30);
  deltaTime = 0;
  noiseImage = loadImage("./assets/image/noise.png");
  plantsImage = loadImage("./assets/image/plants.png");
  
  canvas = createGraphics(width, height, P3D);
  canvas.textureMode(NORMAL);
  textureSahder = canvas.loadShader(
    "./assets/shader/texture/texture.frag", 
    "./assets/shader/texture/texture.vert"
  );

  mainShader = loadShader(
    "shader/texture/Oritatami.frag",
    "shader/texture/Oritatami.vert"
  );
}

void createSierpinski(PGraphics canvas){
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;
  float polygonVertex = 3;
  int polygonSegments = 3;
  canvas.beginDraw();
  canvas.noStroke();
  canvas.background(0, 100, 100);
  canvas.shader(textureSahder);
  textureSahder.set("uTexture", noiseImage);
  canvas.pushMatrix();
  canvas.translate(canvas.width / 2.0, canvas.height / 2.0);
  canvas.rotate(radians(90));
  canvasSierpinski(canvas, width * 0.1, 10, deltaTime, polygonVertex, polygonSegments);
  canvas.popMatrix();
  canvas.endDraw();
}


void draw() {
  background(0, 0, 0);
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;

  createSierpinski(canvas);

  pushMatrix();
  translate(0, 0, 0);
  shader(mainShader);
  mainShader.set("uResolution",float(width), float(height));
  mainShader.set("uTime", uTime);
  mainShader.set("uTexture1", canvas);
  mainShader.set("uTexture2", noiseImage);
  rect(0, 0, width, height);
  popMatrix();

  deltaTime += 0.1;

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
