PGraphics canvasContext;
PGraphics canvasShaderTexture;

PShader rgbDisplacementMap;
PShader textureShader;

PImage noiseImage;
PImage plantsImage;

void setup() {
  size(840, 680, P3D);

  canvasContext = createGraphics(840, 680, P3D);


  canvasShaderTexture = createGraphics(840, 680, P3D);
  canvasShaderTexture.noStroke();

  rgbDisplacementMap = loadShader(
    "shader/postProcessing/rgbDisplacementMap/Custom.frag", 
    "shader/postProcessing/rgbDisplacementMap/Custom.vert"
  );

  textureShader = canvasShaderTexture.loadShader(
    "shader/texture/Oritatami.frag", 
    "shader/texture/Oritatami.vert"
  );
  
  plantsImage = loadImage("assets/plants.png");
  noiseImage = loadImage("assets/noise.png");
}

void setImage(){
  CanvasBox drawing = new CanvasBox(canvasContext);
  drawing.drawBox2();
}

void renderTexture(PImage noiseImage, PImage plantsImage, PShader textureShader){
  CreateTextureShader canvasTexture = new CreateTextureShader(canvasShaderTexture);
  canvasTexture.createTexture1(noiseImage, plantsImage, textureShader);
}

void draw() {
  background(0, 0, 0);
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;
  float uMouseX = map(mouseX, 0.0, width, 0.0, 0.5);
  float uMouseY = map(mouseY, 0.0, height, 0.0, 0.5);
  blendMode(BLEND);
  setImage();
  renderTexture(noiseImage, plantsImage, textureShader);
  // directionalLight(240, 240, 240, 1, 2, -3);
  shader(rgbDisplacementMap);
  rgbDisplacementMap.set("uMouse", uMouseX, uMouseY);
  rgbDisplacementMap.set("uBackground", canvasShaderTexture);
  rgbDisplacementMap.set("uTexture1",canvasContext);
  rgbDisplacementMap.set("uTexture2",noiseImage);
  pushMatrix();
  translate(0, 0, 0);
  image(canvasContext, 0, 0);
  popMatrix();
  resetShader();

  saveFrame("frames3/########.png");
}
