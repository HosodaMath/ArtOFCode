precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTiles;
uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 rgbPixelate(vec2 coord){
  
  float tiles = uTiles;
  coord = coord * tiles;

  coord = floor(coord);

  coord = coord / tiles;

  vec4 calcTexture1 = texture2D(uTexture1, coord);
  vec4 calcTexture2 = texture2D(uTexture2, coord);

  vec4 calcTexture = calcTexture1 * calcTexture2;

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = rgbPixelate(locationCoord);

  gl_FragColor = color;
}
