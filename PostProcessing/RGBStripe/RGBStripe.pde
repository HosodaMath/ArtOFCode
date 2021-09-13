PGraphics canvasContext;
PShader rgbStripe;
PImage noiseImage;
CanvasBox drawing;
void setup() {
  size(840, 680, P3D);

  canvasContext = createGraphics(840, 680, P3D);

  rgbStripe = loadShader(
    "shader/postProcessing/rgbStripe/Custom.frag", 
    "shader/postProcessing/rgbStripe/Custom.vert"
  );

  noiseImage = loadImage("assets/noise.png");
}

void setImage(){
  drawing = new CanvasBox(canvasContext);
  drawing.drawBox2();
}

void draw() {
  background(0, 0, 0);
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;
  blendMode(BLEND);
  setImage();
  // directionalLight(240, 240, 240, 1, 2, -3);
  shader(rgbStripe);
  // rgbStripe.set("uResolution", float(width), float(height));
  // rgbStripe.set("uTime", uTime);
  // rgbStripe.set("uTexture", canvasContext);
  rgbStripe.set("uTexture1",canvasContext);
  rgbStripe.set("uTexture2",noiseImage);
  pushMatrix();
  translate(0, 0, 0);
  image(canvasContext, 0, 0);
  popMatrix();
  resetShader();

  saveFrame("frames/########.png");
}
