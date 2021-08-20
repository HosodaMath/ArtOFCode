precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform float uFrameCount;
uniform sampler2D uTexture;

varying vec2 vTexCoord;
#define PI2 6.28318530718
#define PI 3.141592653589793

vec4 rgbSplit(vec2 coord){
  
  vec2 pixelSize = vec2(1.0) / uResolution;

  vec2 offset = pixelSize * 10.0;

  vec4 redTexture = texture2D(uTexture, coord - offset);
  vec4 greenTexture = texture2D(uTexture, coord);
  vec4 blueTexture = texture2D(uTexture, coord + offset);

  vec4 colorTexture = vec4(redTexture.r, greenTexture.g, blueTexture.b, 1.0);

  return colorTexture;
}

void main(){
  vec2 coord = vTexCoord;

  gl_FragColor = rgbSplit(coord);
}