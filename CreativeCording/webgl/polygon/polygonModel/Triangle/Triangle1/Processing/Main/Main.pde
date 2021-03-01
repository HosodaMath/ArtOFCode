/*
Triangle triangle1;
Color ambientMaterialColor;
void setup() {
fullScreen(P3D);
frameRate(60);
noStroke();

setTriangle();
}

void setTriangle() {
PVector location = new PVector(width / 2.0F, height / 2.0F, 0.0F);
float triangle_size = 100.0F;
ambientMaterialColor = new Color(100.0F, 200.0F, 100.0F);
triangle1 = new Triangle(location, triangle_size);
}

void renderTriangle() {
//triangle1.drawTriangle(ambientMaterialColor);
triangle1.testTriangle(ambientMaterialColor);
}

void draw() {
background(0, 0, 0);

renderTriangle();
}
*/

Triangle[] triangle1;
Color[] fillColor;
Color[] ambientMaterialColor;
final int MAX = 30;
void setup() {
  fullScreen(P3D);
  //size(500, 500, P3D);
  frameRate(60);
  noStroke();
  
  setTriangle();
}

void setTriangle() {
  triangle1 = new Triangle[MAX];
  fillColor = new Color[MAX];
  ambientMaterialColor = new Color[MAX];
  float depth = width;
  for (int count = 0; count < MAX; count++) {
    float location_x = random(50.0F, width - 100.0F);
    float location_y = random(50.0F, height - 100.0F);
    float location_z = random(50.0F, depth / 2.0);
    //System.out.println(location_x + " " + location_y + " " + location_z);
    
    PVector location = new PVector(location_x, location_y, location_z);
    float triangle_size = random(20.0F, 50.0F);
    triangle1[count] = new Triangle(location, triangle_size);
    
    float r = random(50.0F, 100.0F);
    float g = random(150.0F, 250.0F);
    float b = random(100.0F, 250.0F);
    
    fillColor[count] = new Color(r, g, b);
    ambientMaterialColor[count] = new Color(r, g, b);
    
  }
  
  
}

void renderTriangle() {
  pointLight(200.0F, 255.0F, 200.0F, width / 2.0F, height / 2.0F, 100.0F);
  ambientLight(127.0F, 127.0F, 127.0F);
  pushMatrix();
  translate(cos(frameCount * 0.01F) * 50.0F, sin(frameCount * 0.01F) * 50.0F, tan(frameCount * 0.01F) * 50.0F);
  //rotateX(frameCount * 0.01);
  for (int count = 0; count < MAX; count++) {
    //pushMatrix();
    //triangle1[count].testTriangle(fillColor[count]);
    triangle1[count].drawTriangle(ambientMaterialColor[count]);
    //popMatrix();
  }
  popMatrix();
}

void draw() {
  background(0, 0, 0);
  renderTriangle();

  saveFrame("frames/######.png");
}








