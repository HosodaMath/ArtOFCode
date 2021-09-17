precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uTexture;

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

vec4 rgbSplit(vec2 coord){
  
  vec2 pixelSize = vec2(1.0) / uResolution;

  vec2 offset = pixelSize * 10.0;

  vec4 redTexture = texture2D(uTexture, coord - offset);
  vec4 greenTexture = texture2D(uTexture, coord);
  vec4 blueTexture = texture2D(uTexture, coord + offset);

  vec4 calcRGBSplit = vec4(redTexture.r, greenTexture.g, blueTexture.b, 1.0);

  return calcRGBSplit;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  locationCoord = wave_effect(locationCoord);

  vec4 color = rgbSplit(locationCoord);

  gl_FragColor = color;
}
