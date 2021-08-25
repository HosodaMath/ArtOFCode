precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform float uFrameCount;
uniform sampler2D uTexture;

varying vec2 vTexCoord;
#define PI2 6.28318530718
#define PI 3.141592653589793

vec4 invert(vec2 coord){
  vec4 colorTexture = texture2D(uTexture, coord);

  colorTexture.rgb = 1.0 - colorTexture.rgb;

  return colorTexture;
}

void main(){
  vec2 coord = vTexCoord;

  gl_FragColor = invert(coord);
}