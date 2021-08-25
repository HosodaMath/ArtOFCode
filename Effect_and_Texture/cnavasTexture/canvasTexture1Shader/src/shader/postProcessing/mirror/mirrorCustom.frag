precision highp float;
precision highp sampler2D;

// uniform vec2 uResolution;
// uniform vec2 uMouse;
uniform float uTime;
// uniform float uFrameCount;
// uniform float uFrequency;
// uniform float uAmplitude;
uniform sampler2D uTexture;

varying vec2 vTexCoord;

#define PI2 6.28318530718
#define PI 3.141592653589793

vec2 translate(vec2 coord, vec2 offset){
  return coord - offset;
}

vec2 scale(vec2 coord, vec2 size){
  return coord / size;
}

vec2 rotate(vec2 coord, float radian){
  float c = cos(-radian);
  float s = sin(-radian);

  vec2 pos = mat2(c, s, -s, c) * coord;

  return pos;
}

vec4 mirror(vec2 coord){

  vec2 mirrorCoord = vec2(
    abs(coord.x * 2.0 - 1.0), 
    abs(coord.y * 2.0 - 1.0)
  );

  vec4 texture = texture2D(uTexture, mirrorCoord);

  return texture;
}

void main(){
  vec2 coord = vTexCoord;

  gl_FragColor = mirror(coord);
}