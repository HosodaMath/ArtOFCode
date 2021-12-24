class SnowParticleSystem {
  ArrayList<SnowParticle> particles;
  PVector wind;
  boolean flag;
  SnowParticleSystem(){
    particles = new ArrayList<SnowParticle>();
    wind = new PVector(0.01, 0.0);
    // 今は気にしなくて良いです。
    flag = false;
  }


  void addParticleSystem(){
    float particleMax = 500;
    PVector position = new PVector(random(-width * 0.5, width), -height * 0.1);
    float mass = random(1.0, 5.0);
    particles.add(new SnowParticle(position, mass, particleMax));
  }

  void updateParticleSystem(){
    for(int count = particles.size() - 1; count >= 0; count--){
      SnowParticle particle = particles.get(count);
      float mass = particle.mass;
      PVector gravity = new PVector(0.0, 0.01 * mass);
      particle.addForce(wind);
      particle.addForce(gravity);
      particle.update();
      particle.render();
      particle.isCheckEdge();

      if(particle.isRemove()){
        particles.remove(count);
      }
    }
  }

  // 作成途中
  void windController(){
    if(flag == false){
      wind = new PVector(0.01, 0.0);
    } else {
      wind = new PVector(-0.01, 0.0);
    }
  }
}