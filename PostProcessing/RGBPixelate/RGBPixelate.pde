PGraphics canvasContext;
PShader rgbStripe;
PImage noiseImage;
CanvasBox drawing;
void setup() {
  size(840, 680, P3D);

  canvasContext = createGraphics(840, 680, P3D);

  rgbStripe = loadShader(
    "shader/postProcessing/rgbPixelate/Custom.frag", 
    "shader/postProcessing/rgbPixelate/Custom.vert"
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
  float uTiles = map(mouseX, 0.0, width, 50.0, 500.0);
  blendMode(BLEND);
  setImage();
  // directionalLight(240, 240, 240, 1, 2, -3);
  shader(rgbStripe);
  // rgbStripe.set("uResolution", float(width), float(height));
  // rgbStripe.set("uTime", uTime);
  rgbStripe.set("uTiles", uTiles);
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
