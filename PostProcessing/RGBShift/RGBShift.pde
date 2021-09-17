/*
  RGBShift
*/
PGraphics canvasContext;
PGraphics canvasShaderTexture;

PShader rgbShift;
PShader textureShader;

PImage noiseImage;
PImage plantsImage;

void setup() {
  size(840, 680, P3D);
  
  canvasContext = createGraphics(840, 680, P3D);
  rgbShift = loadShader(
    "shader/postProcessing/rgbShift/rgbShift.frag", 
    "shader/postProcessing/rgbShift/rgbShift.vert");
  
  canvasShaderTexture = createGraphics(840, 680, P3D);
  canvasShaderTexture.noStroke();
  textureShader = canvasShaderTexture.loadShader(
    "shader/texture/Oritatami.frag", 
    "shader/texture/Oritatami.vert"
  );

  plantsImage = loadImage("assets/plants.png");
  noiseImage = loadImage("assets/noise.png");
}

void setCanvas() {
  CanvasBox drawing = new CanvasBox(canvasContext);
  drawing.drawBox2();
}

/*
  Shaderを使ったテクスチャの作成
*/
void renderTexture(PImage noiseImage, PImage plantsImage, PShader textureShader){
  CreateTextureShader canvasTexture = new CreateTextureShader(canvasShaderTexture);
  canvasTexture.createTexture1(noiseImage, plantsImage, textureShader);
}

void draw() {
  background(0, 0, 0);
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;
  float uShift = map(mouseX, 0, canvasContext.width, -0.2, 0.2);
  blendMode(BLEND);
  setCanvas();
  renderTexture(noiseImage, plantsImage, textureShader);
  shader(rgbShift);
  rgbShift.set("uShift", uShift);
  rgbShift.set("uTexture1", canvasContext);
  rgbShift.set("uTexture2", canvasShaderTexture);
  pushMatrix();
  translate(0, 0, 0);
  image(canvasContext, 0, 0);
  popMatrix();
  resetShader();
  
}

void keyPressed() {
  String captureSpace = "_";
  if (key == 's') {
    saveFrame("capture/" + "capture_" + 
    minute() + captureSpace + 
    second() + captureSpace + 
    millis() +".png");
  }
}
