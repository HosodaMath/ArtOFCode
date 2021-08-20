precision highp float;
precision highp sampler2D;

// uniform vec2 uResolution;
// uniform vec2 uMouse;
uniform float uTime;
// uniform float uFrameCount;
uniform float uFrequency;
uniform float uAmplitude;
uniform sampler2D uTexture;

varying vec2 vTexCoord;
#define PI2 6.28318530718
#define PI 3.141592653589793

vec4 sinWaveDistort(vec2 coord){
  
  float sinWave = sin(coord.y * uFrequency +  uTime) * uAmplitude;

  vec2 distort = vec2(sinWave, 0.0);

  vec4 colorTexture = texture2D(uTexture, coord + distort);

  return colorTexture;
}

void main(){
  vec2 coord = vTexCoord;
  
  // coord = (1.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);


  gl_FragColor = sinWaveDistort(coord);
}