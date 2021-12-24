/*
  Particle
*/
class SnowParticle {
  PVector position;
  PVector velocity;
  PVector acceleration;
  float mass;
  float particleCounter;
  SnowParticle(PVector initPosition, float initMass, float particleMax){
    position = initPosition.copy();
    velocity = new PVector(0.0, 0.0, 0.0);
    acceleration = new PVector(0.0, 0.0, 0.0);
    mass = initMass;
    particleCounter = particleMax;
  }

  /*
    力を追加
    力は重力や風力などの値を入れていく
  */
  void addForce(PVector force){
    PVector calcForce = PVector.div(force, mass);
    acceleration.add(calcForce);
  }

  /*
    値を更新
    速度ベクトルに加速度ベクトルを加算
    位置ベクトルに速度ベクトルを加算
    加速度ベクトルを0にリセットする。
    Particleの個数をカウントする。値が溢れないように制御するため。
  */
  void update(){
    velocity.add(acceleration);
    position.add(velocity);
    acceleration.mult(0.0);
    particleCounter -= 1.0;
  }

  /*
    particleを表示
  */
  void render(){
    float size = mass;
    // stroke(200, 200, 200);
    fill(240, 240, 250);
    pushMatrix();
    translate(position.x, position.y, position.z);
    ellipse(0, 0, size, size);
    popMatrix();
  }

  void isCheckEdge(){
    float positionMaxX = 100;
    if(position.x < 0.0){
      position.x = 0.0;
      velocity.x *= -1.0;
    } else if(position.x > width) {
      position.x = width + positionMaxX;
      velocity.x *= -1.0;
    }
  }

  boolean isRemove(){
    if(particleCounter < 0.0){
      return true;
    } else {
      return false;
    }
  }
}