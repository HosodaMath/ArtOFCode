precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

varying vec2 vTexCoord;
varying vec3 vNoise;

void main() {
  vec3 color = vec3(
    abs(cos(time) * 0.5), 
    abs(sin(time) * 0.5), 
    vNoise.b
  );

  gl_FragColor = vec4(color, 1.0);
}