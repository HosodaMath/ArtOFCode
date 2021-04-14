import processing.sound.*;
Amplitude amp;
SoundFile sound;
ArrayList<PVector> position;
ArrayList<PVector> velocity;
ArrayList<PVector> size;
final int MAX = 20;
void setup(){
  fullScreen(P3D);
  noStroke();
  init_data();
  amp = new Amplitude(this);
  sound = new SoundFile(this, "sound2.mp3");
  amp.input(sound);
}

void init_data(){
  position = new ArrayList<PVector>();
  velocity = new ArrayList<PVector>();
  size = new ArrayList<PVector>();
  for(int count = 0; count < MAX; count++){
    PVector init_position = new PVector(random(0, width), random(0, height));
    position.add(init_position);
    PVector init_velocity = new PVector(random(-0.5, 0.5), random(-0.5, 0.5));
    velocity.add(init_velocity);
    float init_value = random(50, 100);
    PVector init_size = new PVector(init_value, init_value, init_value);
    size.add(init_size);
  }
}

void draw(){
  background(0, 0, 0);
  renderNoise();
  renderBox();
}

void renderBox(){
  float rms = amp.analyze();
  pointLight(200, 250, 250, width / 2.0, height / 2.0, 500);
  float time = millis() * 0.001;
  for(int count = 0; count < position.size(); count++){
    PVector box_rotation_angle = new PVector(cos(time), sin(time), cos(time));
    Box box1 = new Box(
      position.get(count), 
      velocity.get(count), 
      size.get(count), 
      box_rotation_angle
    );
    box1.draw_velocity();
    box1.draw_box(color(200, 250, 250), rms);
  }
}

void mousePressed(){
  if(sound.isPlaying() == false){
    sound.play();
  }
}