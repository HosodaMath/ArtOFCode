precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 rgbMirror(vec2 coord){
  vec2 mirrorCoord = abs(coord * 2.0 - 1.0);

  vec4 calcTexture = texture2D(uTexture, mirrorCoord);

  return calcTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = rgbMirror(locationCoord);

  gl_FragColor = color;
}
