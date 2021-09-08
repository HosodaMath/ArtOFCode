PGraphics canvasContext;
PShader rgbSplitEffect1;
PImage noiseImage;
Draw drawing;
void setup() {
  size(840, 680, P3D);

  canvasContext = createGraphics(840, 680, P3D);

  rgbSplitEffect1 = loadShader(
    "shader/postProcessing/rgbSplit/Custom.frag", 
    "shader/postProcessing/rgbSplit/Custom.vert"
  );

  noiseImage = loadImage("assets/noise.png");
}

void setImage(){
  drawing = new Draw(canvasContext);
  drawing.drawBox();
}

void draw() {
  background(0, 0, 0);
  float uFrameCount = frameCount * 0.01;
  float uTime = uFrameCount;
  blendMode(BLEND);
  setImage();
  shader(rgbSplitEffect1);
  rgbSplitEffect1.set("uResolution", float(width), float(height));
  rgbSplitEffect1.set("uTime", uTime);
  rgbSplitEffect1.set("uTexture1",canvasContext);
  rgbSplitEffect1.set("uTexture2",noiseImage);
  image(canvasContext, 0, 0);

  saveFrame("frames/########.png");
}
