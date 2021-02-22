ArrayList<Particle> particles;
float time = 0;
void setup(){
  size(512, 512);
  particles = new ArrayList<Particle>();
  frameRate(30);
}

void draw(){
  background(5, 5, 20);
  time += 0.01;
    
  // ループし続けるので際限なく値を格納続ける
  PVector location = new PVector(random(0, width), random(0, height));
  if(time > 0 && time < 10){
    color colors = color(random(20, 30), random(150, 255), random(150, 255));
    particles.add(new Particle(location, colors));
  } else if(time > 10 && time < 20) {
    color colors = color(random(150, 255), random(150, 255), random(20, 30));
    particles.add(new Particle(location, colors));
  }


  for(Particle p : particles){
    p.run();
    p.gravity();
    p.display();
  }

  if(particles.size() > 20){
    particles.remove(0);
  }

  saveFrame("frames/######.png");
}
