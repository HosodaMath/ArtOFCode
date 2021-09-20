/*
  RGBShift
  本来ののRGB Shift
*/
PShader rgbShift;
PImage noiseImage;
PImage plantsImage;

// テクスチャの作成1 Oritatami
PGraphics shaderTexture1;
PShader oritatami;

// テクスチャの作成2 CanvasBox
PGraphics shaderTexture2;


void setup() {
  size(840, 680, P3D);
  noStroke();

  rgbShift = loadShader(
    "shader/postProcessing/rgbShift/rgbShift.frag", 
    "shader/postProcessing/rgbShift/rgbShift.vert");

  plantsImage = loadImage("assets/plants.png");
  noiseImage = loadImage("assets/noise.png");

  // テクスチャの作成1 Oritatami
  shaderTexture1 = createGraphics(840, 680, P3D);
  shaderTexture1.noStroke();
  oritatami = shaderTexture1.loadShader(
    "shader/texture/Oritatami.frag", 
    "shader/texture/Oritatami.vert"
  );

  // テクスチャの作成2 CanvasBox
  shaderTexture2 = createGraphics(840, 680, P3D);
  shaderTexture2.noStroke();
}

// 作成したテクスチャを呼び出す
void createTexture(PImage noiseImage, PImage plantsImage, PShader textureShader){
  // Oritatamiテクスチャ
  CreateTextureShader canvasTexture = new CreateTextureShader(shaderTexture1);
  canvasTexture.createTexture1(noiseImage, plantsImage, textureShader);

  // CanvasBox
  CanvasBox drawing = new CanvasBox(shaderTexture2);
  drawing.drawBox2();
}

void draw() {
  background(0, 0, 0);
  createTexture(noiseImage, plantsImage, oritatami);
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;
  float uShift = map(mouseX, 0, width, -0.2, 0.2);
  blendMode(BLEND);
  shader(rgbShift);
  rgbShift.set("uShift", uShift);
  rgbShift.set("uTime", uTime);
  rgbShift.set("uTexture1", shaderTexture1);
  rgbShift.set("uTexture2", shaderTexture2);
  pushMatrix();
  translate(0, 0, 0);
  rect(0, 0, width, height);
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
