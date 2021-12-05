PGraphics canvas;
PShader mainShader;
PShader flashLight;
void setup() {
  size(1024, 1024, P3D);
  noStroke();

  canvas = createGraphics(width, height, P3D);
  mainShader = canvas.loadShader(
    "shader/texture/rayMarching2.frag", 
    "shader/texture/rayMarching2.vert"
  );

  flashLight = loadShader(
    "shader/postProcessing/flashLight.frag", 
    "shader/postProcessing/flashLight.vert"
  );
}

void shaderGraphics(float uTime){
  canvas.beginDraw();
  canvas.noStroke();
  canvas.background(0, 0, 0);
  canvas.pushMatrix();
  canvas.shader(mainShader);
  mainShader.set("uResolution",float(width), float(height));
  mainShader.set("uTime", uTime);
  canvas.rect(0, 0, width, height);
  canvas.resetShader();
  canvas.popMatrix();
  canvas.endDraw();
}

void draw() {
  float uFrameCount = frameCount;
  float uTime = uFrameCount * 0.01;
  float mousePosX = map(mouseX, 0.0, width, 0.0, 1.0);
  float mousePosY = map(mouseY, 0.0, height, 0.0, 1.0);
  background(0, 0, 0);
  shaderGraphics(uTime);
  pushMatrix();
  flashLight.set("uResolution", float(width), float(height));
  flashLight.set("uMouse", mousePosX, mousePosY);
  flashLight.set("uTexture", canvas);
  shader(flashLight);
  translate(0, 0, 0);
  rect(0, 0, width, height);
  popMatrix();
  resetShader();
  
  // saveFrame("./frames/raymarch#####.png");
}

