float NORTH = 0;
float NORTHEAST = 1;
float EAST = 2;
float SOUTHEAST = 3;
float SOUTH = 4;
float SOUTHWEST = 5;
float WEST = 6;
float NORTHWEST = 7;
float direction;

float stepSize = 1;
float diameter = 1;

PVector pos;

float drawMode = 1;
float counter = 0;

void setup() {
  fullScreen();
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  background(0, 0, 0);
  
  pos = new PVector(width / 2, height / 2);
  
}

void draw() {
  for (int i = 0; i <= mouseX; i++) {
    counter++;

    if(drawMode == 2){
      direction = int(random(3));
    } else {
      direction = int(random(7));
    }

    
    if (direction == NORTH) {
      pos.y -= stepSize;
    } else if (direction == NORTHEAST) {
      pos.x += stepSize;
      pos.y -= stepSize;
    } else if (direction == EAST) {
      pos.x += stepSize;
    } else if (direction == SOUTHEAST) {
      pos.x += stepSize;
      pos.y += stepSize;
    } else if (direction == SOUTH) {
      pos.y += stepSize;
    } else if (direction == SOUTHWEST) {
      pos.x -= stepSize;
      pos.y += stepSize;
    } else if (direction == WEST) {
      pos.x -= stepSize;
    } else if (direction == NORTHWEST) {
      pos.x -= stepSize;
      pos.y -= stepSize;
    }
    
    if (pos.x > width){
      pos.x = 0;
    }
    if (pos.x < 0) {
      pos.x = width; 
    }
    if (pos.x < 0){ 
      pos.y = height; 
    }
    if (pos.y > height){ 
      pos.y = 0; 
    }

    if(drawMode == 3){
      if(counter >= 100){
        counter = 0;
        fill(200, 200, 100, 20);
        ellipse(pos.x + stepSize / 2, pos.y + stepSize / 2, diameter, diameter);
      }
    }

    fill(color(130, 230, 150, 50));
    ellipse(pos.x + stepSize / 2, pos.y + stepSize / 2, diameter, diameter);
  }
}

void keyPressed() {
  if(key == '1'){
    drawMode = 1;
    stepSize = 1;
    diameter = 10;
  }

  if(key == '2'){
    drawMode = 2;
    stepSize = 1;
    diameter = 10;
  }

  if(key == '3'){
    drawMode = 3;
    stepSize = 1;
    diameter = 10;
  }
}