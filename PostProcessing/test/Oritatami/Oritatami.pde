PShader textureShader;
PGraphics canvasTexture;
PImage noiseImage;
PImage plantsImage;
void setup() {
  size(840, 680, P3D);

  canvasTexture = createGraphics(840, 680, P3D);
  canvasTexture.noStroke();

  noiseImage = loadImage("texture/noise.png");
  plantsImage = loadImage("texture/plants.png");
  
  textureShader = canvasTexture.loadShader(
    "shader/texture/Oritatami.frag", 
    "shader/texture/Oritatami.vert"
  );
}

void textureRender1(PImage noiseImage, PImage plantsImage){
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;
  this.canvasTexture.beginDraw();
  canvasTexture.background(0, 0, 0);
  canvasTexture.shader(textureShader);
  textureShader.set("uResolution", float(canvasTexture.width), float(canvasTexture.height));
  textureShader.set("uTime", uTime);
  textureShader.set("uTexture1", noiseImage);
  textureShader.set("uTexture2", plantsImage);
  canvasTexture.pushMatrix();
  canvasTexture.translate(0, 0, 0);
  canvasTexture.rect(0, 0, canvasTexture.width, canvasTexture.height);
  canvasTexture.popMatrix();
  canvasTexture.resetShader();
  canvasTexture.endDraw();

  pushMatrix();
  translate(0, 0, 0);
  image(canvasTexture, 0, 0);
  popMatrix();
}

void draw() {
  background(0, 0, 0);
  textureRender1(noiseImage, plantsImage);

  saveFrame("frames/########.png");
}

