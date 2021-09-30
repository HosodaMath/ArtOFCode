precision highp float;
precision highp int;

// template uniform
// uniform vec2 uResolution;
// uniform vec2 uMouse;
// uniform float uTime;
uniform vec2 uTexelSize;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 singlePassBlur(vec2 coord){
  float spread = 4.0;

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

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = singlePassBlur(locationCoord);

  gl_FragColor = color;
}
