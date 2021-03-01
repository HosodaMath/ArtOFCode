void settings(){
  //size(1024, 1024);
  fullScreen();
}
PImage backgroundImage;
float time;

void setup(){
  noStroke();
  backgroundImage = loadImage("../background.png");
  time = 0.0F;
}

void setBackground(){
    background(0.0F, 0.0F, 0.0F);
    rectMode(CENTER);
    image(backgroundImage, 0.0F, 0.0F);
}


float degToRad(float degree){
  return degree * PI / 180;
}

void burgerMenu1(){
  float x = 512.0F, y = 100.0F;
  push();
  translate(width / 2.0F, height / 3.0F);
  fill(color(255, 255, 255, 100));
  rect(0.0F, 0.0F, x, y, 25.0F);
  pop();

  push();
  translate(width / 2.0F, height / 2.0F);
  fill(color(255, 255, 255, 100));
  rect(0.0F, 0.0F, x, y, 25.0F);
  pop();

  push();
  translate(width / 2.0F, height - height / 3.0F);
  fill(color(255, 255, 255, 100));
  rect(0.0F, 0.0F, x, y, 25.0F);
  pop();
}

public void burgerMenu2(){
  float x = 512.0F, y = 100.0F;
  push();
  translate(width / 2.0F, height / 2.0F);
  rotate(degToRad(45.0F));
  fill(color(150, 200, 255, 200));
  rect(0.0F, 0.0F, x, y, 25.0F);
  pop();

  push();
  translate(width / 2.0F, height / 2.0F);
  fill(color(255, 255, 255, 0));
  rect(0.0F, 0.0F, x, y, 25.0F);
  pop();

  push();
  translate(width / 2.0F, height - height / 2.0F);
  rotate(degToRad(-45.0F));
  fill(color(150, 200, 255, 200));
  rect(0.0F, 0.0F, x, y, 25.0F);
  pop();
}

void draw(){
  time = time + 0.05F;
  setBackground();

  if(time >= 0 && time <= 20) {
    burgerMenu1();
  } else {
    burgerMenu2();
  }
  saveFrame("frames/######.png");
}

