final float MAX = 10;
float depth;
ArrayList<PVector> position;
ArrayList<Flower> flower;
void setup() {
  // size(1024, 1024);
  fullScreen(P3D);
  //frameRate(60);
  depth = width;
  setFlower();
}

void setFlower(){
  
  position = new ArrayList<PVector>();
  flower = new ArrayList<Flower>();

  for (int count = 0; count < MAX; count++) {
    PVector init_position = new PVector(
      random(0, width), 
      random(0, height), 
      random(0, depth)
    );
    position.add(init_position);

    float k = 7.0 / 2.0;
    float init_size = random(50, 100);
    Flower init_flower = new Flower(init_size, k);
    flower.add(init_flower);
  }
}

void draw() {
  background(0, 0, 0);
  ambientLight(250, 250, 150, width / 2.0, height / 2.0, 300);
  for(int count = 0; count < flower.size(); count++){
    pushMatrix();
    translate(position.get(count).x, position.get(count).y);
    rotate(millis() * 0.0005);
    flower.get(count).drawFlower1(color(250, 250, 150));
    popMatrix();
  }
 
}