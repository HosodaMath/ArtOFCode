PGraphics canvasContext;
PShader rgbInvertEffect1;
PImage noiseImage;
CanvasBox drawing;
void setup() {
  size(840, 680, P3D);

  canvasContext = createGraphics(840, 680, P3D);

  rgbInvertEffect1 = loadShader(
    "shader/postProcessing/rgbInvert/rgbInvert.frag", 
    "shader/postProcessing/rgbInvert/rgbInvert.vert"
  );

  noiseImage = loadImage("assets/noise.png");
}

void setImage(){
  drawing = new CanvasBox(canvasContext);
  drawing.drawBox();
}

void draw() {
  background(0, 0, 0);
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;
  blendMode(BLEND);
  setImage();
  shader(rgbInvertEffect1);
  // rgbInvertEffect1.set("uResolution", float(width), float(height));
  // rgbInvertEffect1.set("uTime", uTime);
  rgbInvertEffect1.set("uTexture",canvasContext);
  pushMatrix();
  translate(0, 0, 0);
  image(canvasContext, 0, 0);
  popMatrix();
  resetShader();

  // saveFrame("frames/########.png");
}
