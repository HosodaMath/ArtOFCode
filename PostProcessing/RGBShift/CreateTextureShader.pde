class CreateTextureShader {
  PGraphics canvasTexture;
  CreateTextureShader(PGraphics canvasTexture) {
    this.canvasTexture = canvasTexture;
  }
  
  void createTexture1(PImage noiseImage, PImage plantsImage, PShader textureShader) {
    float uFrameCount = frameCount * 0.01;
    float uTime = uFrameCount;
    this.canvasTexture.beginDraw();
    this.canvasTexture.background(0, 0, 0);
    this.canvasTexture.shader(textureShader);
    textureShader.set(
      "uResolution", 
      float(this.canvasTexture.width), 
      float(this.canvasTexture.height)
    );
    textureShader.set("uTime", uTime);
    textureShader.set("uTexture1", noiseImage);
    textureShader.set("uTexture2", plantsImage);
    this.canvasTexture.pushMatrix();
    this.canvasTexture.translate(0, 0, 0);
    this.canvasTexture.rect(
      0, 
      0, 
      this.canvasTexture.width, 
      this.canvasTexture.height
    );
    this.canvasTexture.popMatrix();
    this.canvasTexture.resetShader();
    this.canvasTexture.endDraw();
  }
}