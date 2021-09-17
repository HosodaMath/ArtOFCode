precision highp float;
precision highp int;

// template uniform
// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
uniform vec2 uTexelSize;
uniform float uMouseX;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 singlePassBlur(vec2 coord, sampler2D uTexture){
  float spread = uMouseX;

  vec2 offset = uTexelSize * spread;

  vec4 calcTexture = texture2D(uTexture, coord);

  calcTexture += texture2D(uTexture, coord + vec2(-offset.x, -offset.y));
  calcTexture += texture2D(uTexture, coord + vec2(0.0, -offset.y));
  calcTexture += texture2D(uTexture, coord + vec2(offset.x, -offset.y));

  calcTexture += texture2D(uTexture, coord + vec2(-offset.x, 0.0));
  calcTexture += texture2D(uTexture, coord + vec2(offset.x, 0.0));

  calcTexture += texture2D(uTexture, coord + vec2(-offset.x, offset.y));
  calcTexture += texture2D(uTexture, coord + vec2(0.0, offset.y));
  calcTexture += texture2D(uTexture, coord + vec2(offset.x, offset.y));

  calcTexture /= 9.0;

  return calcTexture;
}

vec4 calcColor(vec2 coord){
  // vec4 calcTexture1 = singlePassBlur(coord, uTexture1);
  vec4 calcTexture1 = texture2D(uTexture1, coord);

  vec4 calcTexture2 = singlePassBlur(coord, uTexture2);

  vec4 calcTexture = calcTexture1 * calcTexture2;

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = calcColor(locationCoord);

  gl_FragColor = color;
}
