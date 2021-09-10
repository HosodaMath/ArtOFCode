class Sketch {
  PGraphics canvas;
  float size;
  float pricleNumber;
  float segemtNumber;
  Sketch(PGraphics canvas, float size, float pricleNumber, float segemtNumber){
    this.canvas = canvas;
    this.size = size;
    this.pricleNumber = pricleNumber;
    this.segemtNumber = segemtNumber;
  }

  void drawSketch(float uTime){
    this.canvas.beginDraw();
    this.canvas.noStroke();
    this.canvas.background(0, 0, 50);
    this.canvas.directionalLight(240, 240, 240, 1, 2, -3);
    CanvasStar star = new CanvasStar(this.canvas, 50, 5, 5);
    this.canvas.pushMatrix();
    this.canvas.translate(this.canvas.width / 2.0, this.canvas.height / 2.0, 0.0);
    this.canvas.rotateZ(uTime);
    star.drawStarColor(color(240, 240, 200));
    this.canvas.popMatrix();
    this.canvas.endDraw();    
  }

  void sketchShader(
    PShader mainShader,
    float uTime
  ){
    this.canvas.beginDraw();
    this.canvas.noStroke();
    this.canvas.directionalLight(240, 240, 240, 1, 2, -3);
    this.canvas.textureMode(NORMAL);
    this.canvas.background(0, 0, 50);
    this.canvas.pushMatrix();
    this.canvas.translate(0.0, 0.0, 0.0);
    //this.canvas.rotateZ(uTime);
    for(float countX = 0; countX < canvas.width; countX+=200){
      for(float countY = 0; countY < canvas.height; countY+=200){
        this.canvas.pushMatrix();
        this.canvas.translate(countX, countY, 0.0);
        this.canvas.rotateZ(uTime + (countX * 0.5));
        CanvasStar star = new CanvasStar(this.canvas, 50, 5, 5);
        star.drawShaderStar(mainShader);
        this.canvas.popMatrix();
      }
    }
    //this.canvas.pushMatrix();
    //this.canvas.translate(countX, countY, 0.0);
    //CanvasStar star = new CanvasStar(this.canvas, 50, 5, 5);
    //star.drawShaderStar(mainShader);
    //this.canvas.popMatrix();
    this.canvas.popMatrix();
    this.canvas.endDraw();    
  }

  void sketchTextureShader(
    PShader mainShader,
    PImage textureData,
    float uTime
  ){
    this.canvas.beginDraw();
    this.canvas.noStroke();
    this.canvas.directionalLight(240, 240, 240, 1, 2, -3);
    this.canvas.textureMode(NORMAL);
    this.canvas.background(250, 250, 250);
    this.canvas.pushMatrix();
    this.canvas.translate(0.0, 0.0, 0.0);
    //this.canvas.rotateZ(uTime);
    for(float countX = 0; countX < canvas.width; countX+=200){
      for(float countY = 0; countY < canvas.height; countY+=200){
        this.canvas.pushMatrix();
        this.canvas.translate(countX, countY, 0.0);
        this.canvas.rotateZ(uTime + (countX * 0.5) + (countY * 0.3));
        CanvasStar star = new CanvasStar(this.canvas, abs(cos(uTime * 0.5) * 50), 5, 5);
        star.drawShaderTextureStar(mainShader, textureData);
        this.canvas.popMatrix();
      }
    }
    //this.canvas.pushMatrix();
    //this.canvas.translate(countX, countY, 0.0);
    //CanvasStar star = new CanvasStar(this.canvas, 50, 5, 5);
    //star.drawShaderStar(mainShader);
    //this.canvas.popMatrix();
    this.canvas.popMatrix();
    this.canvas.endDraw();    
  }
}
