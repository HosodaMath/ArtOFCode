class Draw {
  PGraphics canvas;
  Draw(PGraphics canvas) {
    this.canvas = canvas;
  }
  
  void drawBox() {
    float uFrameCount = frameCount * 0.01;
    this.canvas.beginDraw();
    this.canvas.noStroke();
    this.canvas.noLights();
    this.canvas.background(0, 0, 0);
    this.canvas.directionalLight(240, 240, 240, 1, 2, -3);
    this.canvas.pushMatrix();
    this.canvas.translate(this.canvas.width / 2.0,  this.canvas.height / 2.0, 0.0);
    this.canvas.rotateX(uFrameCount * 0.01 + 0.05);
    this.canvas.rotateY(uFrameCount * 0.01 + 0.05);
    for (int countX = 1; countX <= 10; countX++) {
      for (int countY = 1; countY <= 10; countY++) {
        float x = 20.0 * cos(countX + 0.5 * noise(countX, countY) + uFrameCount) + 10.5 * 0.5 - 0.25;
        float y = 20.0 * sin(countY + 0.2 * noise(countX, countY) + uFrameCount) + 20.4 * 0.2 - 0.1;
        float z = 10.0 * cos(countX + 0.05 * noise(countX, countY) + uFrameCount * 0.5);
        //this.canvas.translate(x, y, z);
        this.canvas.rotateX(uFrameCount * 0.01 + countX * 0.05);
        this.canvas.rotateY(uFrameCount * 0.01 + countY * 0.05);
        float size = this.canvas.width * 0.2;
        this.canvas.fill(240, 240, 100);
        this.canvas.box(size, size, size);
        this.canvas.fill(200, 250, 250);
        this.canvas.box(size, size, size);
      }
    }
    this.canvas.popMatrix();
    this.canvas.endDraw();
  }
}