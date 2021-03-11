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

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(0, 0, 0);
  
  pos = createVector(width / 2, height / 2);
  
}

function draw() {
  for (let i = 0; i <= mouseX; i++) {
    direction = int(random(0, 8));
    
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
    fill(color(130, 230, 150));
    ellipse(pos.x + stepSize / 2, pos.y + stepSize / 2, diameter, diameter);
  }
}