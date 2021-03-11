const NORTH = 0;
const NORTHEAST = 1;
const EAST = 2;
const SOUTHEAST = 3;
const SOUTH = 4;
const SOUTHWEST = 5;
const WEST = 6;
const NORTHWEST = 7;

let direction;
let stepSize = 1;
let diameter = 1;

let pos;

let drawMode = 1;
let counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  background(0, 0, 0);
  
  pos = createVector(width / 2, height / 2);
  
}

function draw() {
  for (let i = 0; i <= mouseX; i++) {
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
        
        fill(color("rgba(150, 230, 130, 0.2)"));
        ellipse(pos.x + stepSize / 2, pos.y + stepSize / 2, diameter + 7, diameter + 7);
      }
    }

    fill(color("rgba(130, 230, 150, 0.2)"));
    ellipse(pos.x + stepSize / 2, pos.y + stepSize / 2, diameter, diameter);
  }
}

function keyPressed() {
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