interface BaseTrianlge {
  void testTriangle(Color fillColor);
  void drawTriangle(Color ambientMaterialColor);
}

class Triangle implements BaseTrianlge {
  PVector location;
  float triangle_size;
  Triangle(PVector location, float triangle_size) {
    this.location = location;
    this.triangle_size = triangle_size;
  }
  
  void testTriangle(Color fillColor) {
    fill(fillColor.r, fillColor.g, fillColor.b);
    pushMatrix();
  
    translate(this.location.x, this.location.y, this.location.z);
    rotateY(-frameCount * 0.01);
    scale(this.triangle_size);
    
    beginShape(TRIANGLES);
    vertex( - 1.0F, 1.0F, 1.0F);
    vertex(0.0F, - 1.0F, 0.0F);
    vertex(1.0F, 1.0F, 1.0F);
    
    vertex(1.0F, 1.0F, 1.0F);
    vertex(0.0F, - 1.0F, 0.0F);
    vertex(0.0F, 1.0F, - 1.0F);
    
    vertex(0.0F, 1.0F, - 1.0F);
    vertex(0.0F, - 1.0F, 0.0F);
    vertex( - 1.0F, 1.0F, 1.0F);
    
    vertex( - 1.0F, 1.0F, 1.0F);
    vertex(1.0F, 1.0F, 1.0F);
    vertex(0.0F, 1.0F, - 1.0F);
    
    endShape(CLOSE);
    
    popMatrix();
  }
  
  
  void drawTriangle(Color ambientMaterialColor)
  {
    
    ambient(ambientMaterialColor.r, ambientMaterialColor.g, ambientMaterialColor.b);
    
    pushMatrix();
    translate(this.location.x, this.location.y, this.location.z);
    rotateY(- frameCount * 0.01);
    scale(this.triangle_size);
    
    beginShape(TRIANGLES);
    vertex( - 1.0F, 1.0F, 1.0F);
    vertex(0.0F, - 1.0F, 0.0F);
    vertex(1.0F, 1.0F, 1.0F);
    
    vertex(1.0F, 1.0F, 1.0F);
    vertex(0.0F, - 1.0F, 0.0F);
    vertex(0.0F, 1.0F, - 1.0F);
    
    vertex(0.0F, 1.0F, - 1.0F);
    vertex(0.0F, - 1.0F, 0.0F);
    vertex( - 1.0F, 1.0F, 1.0F);
    
    vertex( - 1.0F, 1.0F, 1.0F);
    vertex(1.0F, 1.0F, 1.0F);
    vertex(0.0F, 1.0F, - 1.0F);
    
    endShape(CLOSE);
    
    popMatrix();
  }
  
  /*
  void drawTriangle(Color ambientMaterialColor)
  {
  
  pushMatrix();
  translate(this.location.x, this.location.y, this.location.z + 200.0F);
  pointLight(200.0F, 255.0F, 200.0F, 0.0F, 0.0F, 0.0F);
  ambientLight(127.0F, 127.0F, 127.0F);
  ambient(ambientMaterialColor.r, ambientMaterialColor.g, ambientMaterialColor.b);
  popMatrix();
  
  
  pushMatrix();
  translate(this.location.x, this.location.y, this.location.z);
  rotateY(- frameCount * 0.01);
  scale(this.triangle_size);
  
  beginShape(TRIANGLES);
  vertex( - 1.0F, 1.0F, 1.0F);
  vertex(0.0F, - 1.0F, 0.0F);
  vertex(1.0F, 1.0F, 1.0F);
  
  vertex(1.0F, 1.0F, 1.0F);
  vertex(0.0F, - 1.0F, 0.0F);
  vertex(0.0F, 1.0F, - 1.0F);
  
  vertex(0.0F, 1.0F, - 1.0F);
  vertex(0.0F, - 1.0F, 0.0F);
  vertex( - 1.0F, 1.0F, 1.0F);
  
  vertex( - 1.0F, 1.0F, 1.0F);
  vertex(1.0F, 1.0F, 1.0F);
  vertex(0.0F, 1.0F, - 1.0F);
  
  endShape(CLOSE);
  
  popMatrix();
}*/
}

