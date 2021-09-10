PGraphics sketchCanvas;
PShader rgbSplitEffect1;
PShader materialColor;
PImage noiseImage;
void setup() {
  size(840, 680, P3D);
  noStroke();

  sketchCanvas = createGraphics(840, 680, P3D);
  
  materialColor = sketchCanvas.loadShader(
    "shader/color/colorTexture.frag",
    "shader/color/colorTexture.vert"
  );
  
  
  rgbSplitEffect1 = loadShader(
    "shader/postProcessing/rgbSplit/rgbSplitToon.frag", 
    "shader/postProcessing/rgbSplit/rgbSplitToon.vert"
  );

  noiseImage = loadImage("assets/noise.png");
}

void renderStar(float uTime){
  shader(rgbSplitEffect1);
  rgbSplitEffect1.set("uResolution", float(width), float(height)); 
  rgbSplitEffect1.set("uTexture", sketchCanvas);   
  Sketch sketch = new Sketch(sketchCanvas, 100, 5, 5);
  // sketch.sketchShader(normalMaterial, uTime);
  sketch.sketchTextureShader(materialColor, noiseImage, uTime);
  pushMatrix();
  translate(0.0, 0.0, 0.0);
  rect(0, 0, width, height);
  popMatrix();
}

void draw() {
  background(0, 0, 0);
  float uFrameCount = frameCount * 0.01;
  float uTime = millis() * 0.001;
  
  renderStar(uTime);

  saveFrame("frames/########.png");
}
