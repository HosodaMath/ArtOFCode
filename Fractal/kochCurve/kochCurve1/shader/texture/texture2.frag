precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec4 vertColor;
varying vec4 vertTexCoord;

void main(){
  vec4 coord = vertTexCoord;
  vec2 uv = vec2(coord.x, coord.y);
  vec4 color1 = texture2D(uTexture1, uv);
  vec4 color2 = texture2D(uTexture2, uv);

  vec4 color = color1 * color2;

  gl_FragColor = color;
}
