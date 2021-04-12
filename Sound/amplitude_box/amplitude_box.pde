import processing.sound.*;
Amplitude amp;
SoundFile sound;
void setup(){
  fullScreen(P3D);
  //frameRate(30);
  noStroke();
  amp = new Amplitude(this);
  sound = new SoundFile(this, "sound1.mp3");
  amp.input(sound);
}

void draw(){
  background(0, 0, 0);
  renderBox();

  saveFrame("frames/######.png");
}

void renderBox(){
  float rms = amp.analyze();
  pointLight(200, 250, 250, width / 2.0, height / 2.0, 500);
  float time = millis() * 0.001;
  PVector location = new PVector(width / 2.0, height / 2.0, 0);
  PVector velocity = new PVector(0, 0, 0);
  PVector box_size = new PVector(500 ,500, 500);
  PVector box_rotation_angle = new PVector(cos(time), sin(time), cos(time));
  Box box = new Box(location, velocity, box_size, box_rotation_angle);
  // box.draw_velocity();
  box.draw_box(color(200, 250, 250), rms);
}

void mousePressed(){
  if(sound.isPlaying() == false){
    sound.play();
  }
}

class Box {
  PVector location;
  PVector velocity;
  PVector box_size;
  PVector box_rotation_angle;
  Box(PVector location, PVector velocity, PVector box_size, PVector box_rotation_angle){
    this.location = location;
    this.box_size = box_size;
    this.box_rotation_angle = box_rotation_angle;
  }
  /*
  void draw_velocity(){
    this.location.add(this.velocity);
    if(this.location.x < 0 || this.location.x > width){
      this.velocity.x *= -1;
    }

    if(this.location.y < 0 || this.location.y > height){
      this.velocity.y *= -1;
    }
  }*/

  void draw_box(color fill_color, float rms){
    ambient(fill_color);
    pushMatrix();
    translate(this.location.x, this.location.y, this.location.z);
    rotateX(this.box_rotation_angle.x);
    rotateY(this.box_rotation_angle.y);
    rotateZ(this.box_rotation_angle.z);
    scale(box_size.x * rms, box_size.y * rms, box_size.z * rms);
    beginShape(QUADS);
    // 前面
    vertex(-1.0, -1.0, 1.0);
    vertex( 1.0, -1.0, 1.0);
    vertex( 1.0,  1.0, 1.0);
    vertex(-1.0,  1.0, 1.0);
    // 背面
    vertex(-1.0, -1.0, -1.0);
    vertex(-1.0,  1.0, -1.0);
    vertex( 1.0,  1.0, -1.0);
    vertex( 1.0, -1.0, -1.0);
    // 上面
    vertex(-1.0, -1.0, -1.0);
    vertex(-1.0, -1.0,  1.0);
    vertex( 1.0, -1.0,  1.0);
    vertex( 1.0, -1.0, -1.0);
    // 底面
    vertex(-1.0, 1.0, -1.0);
    vertex(-1.0, 1.0,  1.0);
    vertex( 1.0, 1.0,  1.0);
    vertex( 1.0, 1.0, -1.0);
    // 左側面
    vertex(-1.0, -1.0, -1.0);
    vertex(-1.0, -1.0,  1.0);
    vertex(-1.0,  1.0,  1.0);
    vertex(-1.0,  1.0, -1.0);
    // 右側面
    vertex(1.0, -1.0, -1.0);
    vertex(1.0,  1.0, -1.0);
    vertex(1.0,  1.0,  1.0);
    vertex(1.0, -1.0,  1.0);
    endShape(CLOSE);
    popMatrix();
  }


}
