precision highp float;
precision highp int;

// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float UTime;
uniform float uShift;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec4 vertTexCoord;

vec4 rgbShift(vec2 coord){
  vec4 redTexture1 = texture2D(uTexture1, vec2(coord.x - uShift, coord.y));
  vec4 greenTexture1 = texture2D(uTexture1, vec2(coord.x, coord.y));
  vec4 blueTexture1 = texture2D(uTexture1, vec2(coord.x + uShift, coord.y));
  vec4 calcTexture1 = vec4(redTexture1.r, redTexture1.g, redTexture1.b, 1.0);

  vec4 redTexture2 = texture2D(uTexture2, vec2(coord.x - uShift, coord.y));
  vec4 greenTexture2 = texture2D(uTexture2, vec2(coord.x, coord.y));
  vec4 blueTexture2 = texture2D(uTexture2, vec2(coord.x + uShift, coord.y));
  vec4 calcTexture2 = vec4(redTexture2.r, redTexture1.g, redTexture1.b, 1.0);

  vec4 calcTexture = calcTexture1 * calcTexture2;

  vec4 color = vec4(calcTexture.r, calcTexture.g, calcTexture.b, 1.0);

  return color;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = rgbShift(locationCoord);

  gl_FragColor = color;
}
