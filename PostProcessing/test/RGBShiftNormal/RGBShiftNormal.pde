/*
  RGBShift
  本来ののRGB Shift
*/
PShader rgbShift;
PImage noiseImage;
PImage plantsImage;

// テクスチャの作成
PGraphics shaderTexture;
PShader oritatami;


void setup() {
  size(840, 680, P3D);
  noStroke();

  rgbShift = loadShader(
    "shader/postProcessing/rgbShift/rgbShift.frag", 
    "shader/postProcessing/rgbShift/rgbShift.vert");

  plantsImage = loadImage("assets/plants.png");
  noiseImage = loadImage("assets/noise.png");

  // テクスチャの作成
  shaderTexture = createGraphics(840, 680, P3D);
  shaderTexture.noStroke();
  oritatami = shaderTexture.loadShader(
    "shader/texture/Oritatami.frag", 
    "shader/texture/Oritatami.vert"
  );
}

// 作成したテクスチャを呼び出す
void createTexture(PImage noiseImage, PImage plantsImage, PShader textureShader){
  CreateTextureShader canvasTexture = new CreateTextureShader(shaderTexture);
  canvasTexture.createTexture1(noiseImage, plantsImage, textureShader);
}

void draw() {
  background(0, 0, 0);
  createTexture(noiseImage, plantsImage, oritatami);
  // float uFrameCount = frameCount * 0.01;
  // float uTime = uFrameCount;
  float uShift = map(mouseX, 0, width, -0.2, 0.2);
  blendMode(BLEND);
  shader(rgbShift);
  rgbShift.set("uShift", uShift);
  rgbShift.set("uTexture1", shaderTexture);
  rgbShift.set("uTexture2", noiseImage);
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
