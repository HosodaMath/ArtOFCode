precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
varying vec2 vTexCoord;

void main() {
  vec2 coord = vTexCoord;

  vec3 color = vec3(coord.x, coord.y, 0.0);

  gl_FragColor = vec4(color, 1.0);
}