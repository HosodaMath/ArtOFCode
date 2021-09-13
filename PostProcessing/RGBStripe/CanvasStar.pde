class CanvasStar implements StarType {
  PGraphics canvas;
  float size;
  float pricleNumber;
  float segemtNumber;
  CanvasStar(PGraphics canvas, float size, float pricleNumber, float segemtNumber) {
    this.canvas = canvas;
    this.size = size;
    this.pricleNumber = pricleNumber;
    this.segemtNumber = segemtNumber;
  }
  
  void starColor(color fillColor) {
    float vertexNumber = pricleNumber * 2.0;
    float segemt = segemtNumber * 2.0;
    this.canvas.fill(fillColor);
    this.canvas.beginShape();
    for (float theta = 0; theta <= segemt; theta++) {
      float starSize = 0;
      if (theta % 2 == 0) {
        starSize = this.size / 2.0;
      } else {
        starSize = this.size;
      }
      
      float radianX = cos(radians(360.0 * theta) / vertexNumber);
      float radianY = sin(radians(360.0 * theta) / vertexNumber);
      float vertexX = radianX * starSize;
      float vertexY = radianY * starSize;
      float vertexZ = 0;
      float u = 0.5 + radianX / 2.0;
      float v = 0.5 + radianY / 2.0;
      this.canvas.vertex(vertexX, vertexY, vertexZ, u, v);
    }
    this.canvas.endShape(CLOSE);
  }
  
  void starShader(PShader starShader) {
    float vertexNumber = pricleNumber * 2.0;
    float segemt = segemtNumber * 2.0;
    this.canvas.shader(starShader);
    this.canvas.beginShape();
    for (float theta = 0; theta <= segemt; theta++) {
      float starSize = 0;
      if (theta % 2 == 0) {
        starSize = this.size / 2.0;
      } else {
        starSize = this.size;
      }
      
      float radianX = cos(radians(360.0 * theta) / vertexNumber);
      float radianY = sin(radians(360.0 * theta) / vertexNumber);
      float vertexX = radianX * starSize;
      float vertexY = radianY * starSize;
      float vertexZ = 0;
      float u = 0.5 + radianX / 2.0;
      float v = 0.5 + radianY / 2.0;
      this.canvas.vertex(vertexX, vertexY, vertexZ, u, v);
    }
    this.canvas.endShape(CLOSE);
    this.canvas.resetShader();
  }
}