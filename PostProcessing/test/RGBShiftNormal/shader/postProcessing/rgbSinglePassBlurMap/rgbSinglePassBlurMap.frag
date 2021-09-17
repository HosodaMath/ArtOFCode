precision highp float;
precision highp int;

// template uniform
// uniform vec2 uResolution;
uniform vec2 uMouse;
// uniform float uTime;
uniform vec2 uTexelSize;
uniform sampler2D uBackground;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 singlePassBlur(vec2 coord, sampler2D uTexture){
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

vec4 rgbDisplacementMap(vec2 coord, vec4 calcTexture){
  
  vec4 calcTexture1 = calcTexture;

  float avg = dot(calcTexture1.rgb, vec3(0.33333));

  avg = avg * 2.0 - 1.0;

  float dispX = avg * uMouse.x;
  float dispY = avg * uMouse.y;
  vec2 calcDisp = vec2(coord.x + dispX, coord.y + dispY);
  
  vec4  calcRGBDisp = texture2D(uBackground, calcDisp);

  return calcRGBDisp;
}

vec4 calcColor(vec2 coord){
  vec4 calcTexture1 = singlePassBlur(coord, uTexture);

  vec4 calcTexture = calcTexture1 * rgbDisplacementMap(coord, calcTexture1);

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = calcColor(locationCoord);

  gl_FragColor = color;
}
