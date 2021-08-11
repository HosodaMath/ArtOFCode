precision highp float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

void main(){
  
  vec3 color = vec3(0.0, 0.5, 1.0);

  gl_FragColor = vec4(color, 1.0);
}