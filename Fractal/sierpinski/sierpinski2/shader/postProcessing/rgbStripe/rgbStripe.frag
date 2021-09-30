precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 rgbStripe(vec2 coord){
  
  vec2 tc = vec2(0.5, coord.y);

  vec4 calcTexture = texture2D(uTexture, tc);

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = rgbStripe(locationCoord);

  gl_FragColor = color;
}
