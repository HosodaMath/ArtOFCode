precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform float uTime;
uniform float uFrequancy;
uniform float uAmplitude;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec4 vertColor;
varying vec4 vertTexCoord;

/*
vec4 sinWave(vec2 coord){
  
  float calcSinWave = sin(coord.y * uFrequancy + uTime) * uAmplitude;

  vec2 distort = vec2(calcSinWave, 0.0);

  vec4 calcTexture1 = texture2D(uTexture1, coord + distort);
  vec4 calcTexture2 = texture2D(uTexture2, coord + distort);

  vec4 calcTexture = calcTexture1 * calcTexture2;

  return calcTexture;
}*/

/*
vec4 cosWave(vec2 coord){
  
  float calcCosWave = cos(coord.y * uFrequancy + uTime) * uAmplitude;

  vec2 distort = vec2(calcCosWave, 0.0);

  vec4 calcTexture1 = texture2D(uTexture1, coord + distort);
  vec4 calcTexture2 = texture2D(uTexture2, coord + distort);

  vec4 calcTexture = calcTexture1 * calcTexture2;

  return calcTexture;
}*/

vec4 wave(vec2 coord){
  
  float calcCosWave = cos(coord.x * uFrequancy + uTime) * uAmplitude;
  float calcSinWave = sin(coord.y * uFrequancy + uTime) * uAmplitude;

  vec2 distort = vec2(calcCosWave ,calcSinWave);

  vec4 calcTexture1 = texture2D(uTexture1, coord + distort);
  vec4 calcTexture2 = texture2D(uTexture2, coord + distort);

  vec4 calcTexture = calcTexture1 * calcTexture2;

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = wave(locationCoord);

  gl_FragColor = color;
}
