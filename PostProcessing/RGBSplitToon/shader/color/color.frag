precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

vec4 createColor(vec4 coord){

  vec4 color = vec4(coord.x, coord.y, 0.5, 1.0);

  vec4 calcColor = color;

  return calcColor;
}

void main(){
  vec4 coord = vertTexCoord;

  vec4 color = createColor(coord);

  gl_FragColor = color;
}
