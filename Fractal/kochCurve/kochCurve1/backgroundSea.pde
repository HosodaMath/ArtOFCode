void createWaterWorld(
  PGraphics canvas, 
  ArrayList<MiniParticle> particle
  ){
  PVector position = new PVector(random(0, canvas.width),canvas.height + 10);
  PVector velocity = new PVector(0, 2);
  float radius = random(3, 8);
  particle.add(new MiniParticle(canvas, position, velocity, radius));
  
  canvas.beginDraw();
  canvas.noStroke();
  canvas.background(0, 0, 0);
  
  for(MiniParticle drawP: particle){
    drawP.particleUpdate();
    drawP.particleDraw();
  }

  if(particle.size() > 300){
    particle.remove(0);
  }

  
  canvas.endDraw();
}