precision highp float;
precision highp int;

// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float UTime;
uniform float uShift;
uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec4 vertColor;
varying vec4 vertTexCoord;
#define PI2 6.28318530718

vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * cos(coord.x * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.x * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * sin(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}

/* 
  x軸のみShift
*/
vec4 rgbShift(vec2 coord, sampler2D uTexture){
  vec4 redTexture = texture2D(uTexture, vec2(coord.x - uShift, coord.y));
  vec4 greenTexture = texture2D(uTexture, vec2(coord.x, coord.y));
  vec4 blueTexture = texture2D(uTexture, vec2(coord.x + uShift, coord.y));

  vec4 calcTexture = vec4(redTexture.r, greenTexture.g, blueTexture.b, 1.0);

  return calcTexture;
}

vec4 calcColor(vec2 coord){
  vec4 calcTexture1 = rgbShift(coord, uTexture1);
  vec4 calcTexture2 = rgbShift(coord, uTexture2);

  vec4 calcTexture = calcTexture1 * calcTexture2;

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  locationCoord = wave_effect(locationCoord);

  vec4 color = calcColor(locationCoord);

  gl_FragColor = color;
}