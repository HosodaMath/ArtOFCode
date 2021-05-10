import ddf.minim.*;
import ddf.minim.analysis.*;
import ddf.minim.effects.*;
import ddf.minim.signals.*;
import ddf.minim.spi.*;
import ddf.minim.ugens.*;

Minim minim = new Minim(this);
AudioPlayer audio_player;

boolean isPlaying = false;

void setup() {
  fullScreen();
  //noStroke();
  colorMode(HSB, 360, 100, 100, 100);
  audio_player = minim.loadFile("sound3.mp3");
}

void draw() {
  background(0, 0, 0);
  /// 1024
  /// println(audio_player.bufferSize());
  render();
}

void render() {
  pushMatrix();
  translate(width / 2.0, height / 2.0);
  rotate(millis() * 0.001);
  float sizeL = audio_player.left.level();
  float sizeR = audio_player.right.level();
  for (float count = 0; count < TAU; count +=0.1) {  
    fill(count * 60, 100, 100);
    pushMatrix();
    rotate(count);
    rect(0, 0, sizeL * 5, sizeR * height - 300);
    popMatrix();
  }
  popMatrix();
}

void mousePressed() {
  if (isPlaying == false) {
    audio_player.play();
    isPlaying = true;
  } else {
    audio_player.pause();
    isPlaying = false;
  }
}
