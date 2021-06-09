/*
  Fractal Brown Motion
*/
precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define PI 3.141592653589793
#define TWO_PI 6.283185307179586

float random(float value){
  return fract(sin(value * 12.9898) * 43758.5453);
}

float noise(float value) {
  float i = floor(value);
  float f = smoothstep(0.0, 1.0, fract(value));

  return mix(random(i), random(i + 1.0), f);
}

float fbm(float value){
  float result = 0.0;
  float amp = 0.5;
  for(int i = 0; i < 5; i++){
    result += amp * noise(value);
    value *= 2.01;
    amp *= 0.5;
  }

  return result;
}

vec3 wave(vec2 position) {
  vec2 add = vec2(abs(cos(position.x)), abs(sin(position.y)));
  float len = length(20.0 * add);
  float t = cos(len - time);
  float s = t * 0.5 + 0.5;

  return vec3(s);
}

vec3 createColor(vec2 p, vec3 wave_data){
  vec3 color1 = vec3(0.0, 0.0, 0.0);
  vec3 color2 = vec3(fbm(p.x * 10.0), fbm(p.y * 10.0), abs(sin(p.y)));
  vec3 color = mix(color1, color2, smoothstep(0.8, 0.9, wave_data));

  return color;
}

void main(){
  vec2 p = gl_FragCoord.xy / resolution;
  vec2 uv = (10.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  vec3 wave_data = wave(uv);
  vec3 color = createColor(p, wave_data);
  gl_FragColor = vec4(color, 1.0);
}