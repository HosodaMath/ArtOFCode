precision highp float;
precision highp int;

uniform vec2 uResolution;
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

vec4 rgbMirror(vec2 coord){
  vec2 mirrorCoord = vec2(
    abs(coord.x * 2.0 - 1.0), 
    abs(coord.y * 2.0 - 1.0)
  );

  vec4 calcTexture1 = texture2D(uTexture1, mirrorCoord);
  vec4 calcTexture2 = texture2D(uTexture2, coord);

  vec4 calcTexture = calcTexture1 * calcTexture2;

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  locationCoord = wave_effect(locationCoord);

  vec4 color = rgbMirror(locationCoord);

  gl_FragColor = color;
}
