precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define TWO_PI 6.283185307179586

float circle1(vec2 uv){
  float radius = 0.35 + 0.1 * sin(TWO_PI * time / 10.0);
  // circle dist
  return length(uv) - radius;
}

float random2d(vec2 value){
  return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 createColor(vec2 position, float circle_data){
  vec3 color1 = vec3(0.0, 0.0, 0.0);
  vec3 color2 = vec3(
    1.0, 
    abs(cos(position.x + (time * 0.5))), 
    abs(tan(position.y + (time * 0.5)))
  );

  vec3 color = mix(color1, color2, circle_data);

  return color;
}

void main(void){
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 position = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  float circle = circle1(position);
  vec3 color = createColor(position, circle);
  gl_FragColor = vec4(color , 1.0);
}