precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform float uTime;
uniform float uFrequancy;
uniform float uAmplitude;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 sinWave(vec2 coord){
  
  float calcSinWave = sin(coord.y * uFrequancy + uTime) * uAmplitude;

  vec2 distort = vec2(calcSinWave, 0.0);

  vec4 calcTexture = texture2D(uTexture, coord + distort);

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = sinWave(locationCoord);

  gl_FragColor = color;
}
