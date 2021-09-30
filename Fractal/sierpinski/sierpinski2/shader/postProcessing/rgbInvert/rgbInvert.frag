precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 rgbInvert(vec2 coord){
  vec4 colorTexture = texture2D(uTexture, coord);

  colorTexture.rgb = 1.0 - colorTexture.rgb;

  return colorTexture;
}

void main(){
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);

  vec4 color = rgbInvert(locationCoord);

  gl_FragColor = color;
}
