precision highp float;
precision highp sampler2D;

// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
// uniform float uFrameCount;
// uniform float uFrequency;
// uniform float uAmplitude;
uniform sampler2D uTexture;

varying vec2 vTexCoord;

#define PI2 6.28318530718
#define PI 3.141592653589793

vec4 mirror(vec2 coord){
  vec2 mirrorCoord = abs(coord * 2.0 - 1.0);

  vec4 texture = texture2D(uTexture, mirrorCoord);

  return texture;
}

void main(){
  vec2 coord = vTexCoord;

  gl_FragColor = mirror(coord);
}