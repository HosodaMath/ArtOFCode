precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform float uTile;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 rgbChecker(vec2 coord){

  vec4 calcTexture1 = texture2D(uTexture1, coord);
  vec4 calcTexture2 = texture2D(uTexture2, coord);

  vec2 location = coord;
  location.x *= uResolution.x / uResolution.y;
  
  float col = mod(floor(location.x * uTile) + floor(location.y * uTile), 2.0);

  vec4 checker = vec4(vec3(col), 1.0);

  vec4 calcTexture = calcTexture1 * calcTexture2 * checker;

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = rgbChecker(locationCoord);

  gl_FragColor = color;
}
