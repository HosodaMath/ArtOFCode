PGraphics canvasContext;
PShader rgbSinWaveDistort;
PImage noiseImage;
CanvasBox drawing;
void setup() {
  size(840, 680, P3D);

  canvasContext = createGraphics(840, 680, P3D);

  rgbSinWaveDistort = loadShader(
    "shader/postProcessing/rgbSinWaveDistort/Custom.frag", 
    "shader/postProcessing/rgbSinWaveDistort/Custom.vert"
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
  float uFrequancy = map(mouseX, 0, width, 0, 10.0);
  float uAmplitude = map(mouseY, 0, height, 0, 0.25);
  blendMode(BLEND);
  setImage();
  directionalLight(240, 240, 240, 1, 2, -3);
  shader(rgbSinWaveDistort);
  // rgbSinWaveDistort.set("uResolution", float(width), float(height));
  rgbSinWaveDistort.set("uTime", uTime);
  rgbSinWaveDistort.set("uFrequancy", uFrequancy);
  rgbSinWaveDistort.set("uAmplitude", uAmplitude );
  // rgbSinWaveDistort.set("uTexture", canvasContext);
  rgbSinWaveDistort.set("uTexture1",canvasContext);
  rgbSinWaveDistort.set("uTexture2",noiseImage);
  pushMatrix();
  translate(0, 0, 0);
  image(canvasContext, 0, 0);
  popMatrix();
  resetShader();

  saveFrame("frames/########.png");
}
