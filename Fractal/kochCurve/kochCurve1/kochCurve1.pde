ArrayList<MiniParticle> particle;
PGraphics backgroundCanvas;
PGraphics backgroundCanvasShader;
PShader backgorundShader;

PGraphics kochCanvas;
PGraphics kochShaderCanvas;
PShader kochShader;

PShader mainShader;
PImage noiseImage;
void setup() {
  //size(680, 480, P3D);
  size(1024, 1024, P3D);
  noStroke();
  frameRate(30);

  particle = new ArrayList<MiniParticle>();
  backgroundCanvas = createGraphics(width, height, P3D);
  backgroundCanvasShader = createGraphics(width, height, P3D);
  backgorundShader = backgroundCanvasShader.loadShader(
    "shader/postProcessing/rgbMirror/CustomColor.frag",
    "shader/postProcessing/rgbMirror/CustomColor.vert"
  );

  kochCanvas = createGraphics(width, height, P3D);
  kochShaderCanvas = createGraphics(width, height, P3D);
  kochShader = kochShaderCanvas.loadShader(
    "shader/postProcessing/rgbMirror/CustomColor.frag",
    "shader/postProcessing/rgbMirror/CustomColor.vert"
  );

  mainShader = loadShader(
    "shader/texture/Oritatami.frag",
    "shader/texture/Oritatami.vert"
  );

  noiseImage = loadImage("image/noise.png");
}

void createWaterWorldShader(){
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;
  backgroundCanvasShader.beginDraw();
  backgroundCanvasShader.background(0 ,0 ,0);
  backgroundCanvasShader.pushMatrix();
  backgroundCanvasShader.shader(backgorundShader);
  backgorundShader.set("uTime", uTime);
  backgorundShader.set("uTexture", backgroundCanvas);
  backgroundCanvasShader.translate(0, 0, 0);
  backgroundCanvasShader.rect(0, 0, backgroundCanvasShader.width, backgroundCanvasShader.height);
  backgroundCanvasShader.popMatrix();
  backgroundCanvasShader.endDraw();
}

void createKochShader(){
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;
  kochShaderCanvas.beginDraw();
  kochShaderCanvas.background(0 ,0 ,0);
  kochShaderCanvas.pushMatrix();
  kochShaderCanvas.shader(kochShader);
  kochShader.set("uTime", uTime);
  kochShader.set("uTexture", kochCanvas);
  kochShaderCanvas.translate(0, 0, 0);
  kochShaderCanvas.rect(0, 0, kochShaderCanvas.width, kochShaderCanvas.height);
  kochShaderCanvas.popMatrix();
  kochShaderCanvas.endDraw();
}

void draw() {
  background(0, 0, 0);
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;

  createWaterWorld(backgroundCanvas, particle);
  createWaterWorldShader();

  PVector pointA = new PVector(0, 0);
  PVector pointB = new PVector(kochCanvas.width, 0);
  createKochCurve(pointA, pointB);
  createKochShader();
  
  pushMatrix();
  translate(0, 0, 0);
  //image(backgroundCanvasShader, 0, 0);
  //image(kochShaderCanvas, 0, 0);
  shader(mainShader);
  mainShader.set("uResolution", float(width), float(height));
  mainShader.set("uTime", uTime);
  mainShader.set("uTexture1", kochShaderCanvas);
  mainShader.set("uTexture2", noiseImage);
  rect(0, 0, width, height);
  popMatrix();
  
  saveFrame("frames/#######.png");
}
