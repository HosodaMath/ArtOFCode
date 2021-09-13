PGraphics canvasContext;
PShader rgbMirrorEffect;
PImage noiseImage;
CanvasBox drawing;
void setup() {
  size(840, 680, P3D);

  canvasContext = createGraphics(840, 680, P3D);

  rgbMirrorEffect = loadShader(
    "shader/postProcessing/rgbMirror/Custom.frag", 
    "shader/postProcessing/rgbMirror/Custom.vert"
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
  directionalLight(240, 240, 240, 1, 2, -3);
  shader(rgbMirrorEffect);
  // rgbMirrorEffect.set("uResolution", float(width), float(height));
  rgbMirrorEffect.set("uTime", uTime);
  // rgbMirrorEffect.set("uTexture",canvasContext);
  rgbMirrorEffect.set("uTexture1",canvasContext);
  rgbMirrorEffect.set("uTexture2",noiseImage);
  pushMatrix();
  translate(0, 0, 0);
  image(canvasContext, 0, 0);
  popMatrix();
  resetShader();

  // saveFrame("frames/########.png");
}
