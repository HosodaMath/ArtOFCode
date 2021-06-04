precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define TWO_PI 6.283185307179586

float random(float value){
  return sin(value * 12.9898) * 43758.5453;
}

float noise(float value){
  return random(value);
}

vec3 createColor(vec3 data, vec2 uv){
  vec3 color1 = vec3(abs(cos(time * 0.5)), uv.x, uv.y);
  vec3 color2 = vec3(0.1804, 0.0157, 0.4863);
  
  return mix(color1, color2, smoothstep(0.8, 0.9, data));
}

void main(void){
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 position = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  float positionX = cos(time * position.x);
  float positionY = sin(time * position.x);
  // gl_FragColor = vec4(noise(positionX * 50.0), noise(positionY * 50.0), 1.0, 1.0);
  // gl_FragColor = vec4(noise(position.x * 50.0), uv.x, uv.y, 1.0);
  vec3 color = createColor(vec3(noise(position.x * 50.0)), uv);
   gl_FragColor = vec4(color, 1.0);
}