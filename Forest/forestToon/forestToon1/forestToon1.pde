PShape forestShape;
PShader forestShader;
PShape stageShape;
PShader stageShader;
PShader airShader;
void setup() {
  size(1024, 1024, P3D);
  noStroke();
  textureMode(NORMAL);

  stageShape = loadShape("./model/stage.obj");
  stageShader = loadShader(
    "./shader/material/stageToon.frag", 
    "./shader/material/stageToon.vert"
  );

  forestShape = loadShape("./model/forest.obj");
  forestShader = loadShader(
    "./shader/material/forestToon.frag", 
    "./shader/material/forestToon.vert"
  );

  airShader = loadShader(
    "./shader/material/airToon.frag", 
    "./shader/material/airToon.vert"
  );
}


void draw() {
  float dirX = (mouseX / float(width) - 0.5) * 2.0;
  float dirY = (mouseY / float(height) - 0.5) * 2.0;
  PVector mousePos = new PVector(mouseX, mouseY);
  float primitiveRotateY = PI / 3.0 + mousePos.x / float(width) * PI;
  background(0, 0, 0);
  
  directionalLight(204, 204, 204, -dirX, -dirY, -1);

  renderAir(airShader, primitiveRotateY);
  renderStage(stageShader, stageShape, primitiveRotateY); 
  renderForest(forestShader, forestShape, primitiveRotateY);

  saveFrame("frames/######.png");
}
