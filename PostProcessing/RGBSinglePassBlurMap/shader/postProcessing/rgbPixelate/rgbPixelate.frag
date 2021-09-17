precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTiles;
uniform float uTime;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 rgbPixelate(vec2 coord){
  
  float tiles = uTiles;
  coord = coord * tiles;

  coord = floor(coord);

  coord = coord / tiles;

  vec4 calcTexture = texture2D(uTexture, coord);

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = rgbPixelate(locationCoord);

  gl_FragColor = color;
}
