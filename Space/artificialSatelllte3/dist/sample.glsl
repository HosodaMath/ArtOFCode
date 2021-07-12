precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float random(vec2 value){
  return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
}

float circle(vec2 coord){
  return length(coord * 2.0 - 1.0);
}

vec3 createColor(vec2 coord){
  float speed = 0.5;
  float slowTime = time * speed;
  float circle_data = circle(coord);
  circle_data += slowTime;
  circle_data = fract(circle_data);
  vec3 color = vec3(circle_data, circle_data, circle_data);

  return color;
}

void main() {
  vec2 coord = gl_FragCoord.xy / resolution;

  vec3 color = createColor(coord);
  gl_FragColor = vec4(color, 1.0);
}