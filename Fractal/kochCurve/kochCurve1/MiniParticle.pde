class MiniParticle {
  PGraphics canvas;
  PVector position;
  PVector velocity;
  float radius;
  MiniParticle(
    PGraphics canvas,
    PVector position,
    PVector velocity,
    float radius
  ){
    this.canvas = canvas;
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
  }

  void particleUpdate(){
    this.position.sub(this.velocity);
  }

  void particleDraw(){
    float shiftX = random(-1, 1);
    this.canvas.pushMatrix();
    this.canvas.translate(
      this.position.x + shiftX, 
      this.position.y, 
      0.0
    );
    this.canvas.fill(200, 240, 240);
    this.canvas.circle(0, 0, this.radius);
    this.canvas.popMatrix();
  }
}