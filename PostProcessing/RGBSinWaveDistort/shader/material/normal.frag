precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;
varying vec3 vertNormal;

void main(){
  vec4 coord = vertTexCoord;

  vec4 color = vec4(vertNormal, 1.0);

  gl_FragColor = color;
}
