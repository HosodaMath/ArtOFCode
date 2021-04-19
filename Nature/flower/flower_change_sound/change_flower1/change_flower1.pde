import processing.sound.*;
Amplitude amp;
SoundFile sound;
final float MAX = 25;
float depth;
ArrayList<PVector> position;
ArrayList<Flower> flower;
ArrayList<Integer> colors = new ArrayList<Integer>();
void setup() {
  fullScreen(P3D);
  amp = new Amplitude(this);
  sound = new SoundFile(this, "sound3.mp3");
  amp.input(sound);

  depth = width;
  setFlower();
}

void setFlower(){
  final color[] color_set = {
    color(255, 193, 143), 
    color(245, 252, 174), 
    color(250, 170, 214)
  };
  position = new ArrayList<PVector>();
  flower = new ArrayList<Flower>();
  colors = new ArrayList<Integer>();
  for (int count = 0; count < MAX; count++) {
    PVector init_position = new PVector(
      random(0, width), 
      random(0, height), 
      random(0, depth)
    );
    position.add(init_position);
    
    float number_choice = floor(random(2.0, 4.0));
    float k = 7.0 / number_choice;
    float init_size = random(50, 100);
    Flower init_flower = new Flower(init_size, k);
    flower.add(init_flower);
    
    int color_choice = floor(random(0, color_set.length));
    colors.add(color_set[color_choice]);

  }
}

void draw() {
  background(0, 0, 0);
  float rms = amp.analyze();
  ambientLight(250, 250, 150, width / 2.0, height / 2.0, 300);
  for(int count = 0; count < flower.size(); count++){
    pushMatrix();
    translate(position.get(count).x, position.get(count).y);
    rotate(millis() * 0.001);
    flower.get(count).drawSoundFlower1(colors.get(count), rms);
    popMatrix();
  }
}

void mousePressed() {
  if(sound.isPlaying() == false){
    sound.play();
  }
}