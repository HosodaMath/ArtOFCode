precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

varying vec4 vertColor;
varying vec4 vertTexCoord;

void main(){
  vec4 coord = vertTexCoord;
  vec2 uv = vec2(coord.x, coord.y);
  vec4 color = texture2D(uTexture, uv);

  gl_FragColor = color;
}
