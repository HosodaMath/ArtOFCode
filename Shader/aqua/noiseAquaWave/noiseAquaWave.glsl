precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define TWO_PI 6.283185307179586

vec3 wave(vec2 position) {
  vec2 add = vec2(tan(position.x), sin(position.y));
  float len = length(20.0 * add);
  float t = cos(len - time);
  float s = t * 0.5 + 0.5;

  return vec3(s);
}

float random1d(float value){
  return fract(sin(value * 12.9898) * 43758.5453);
}

float noise1d(float value){
  float i = floor(value);
  float f = smoothstep(0.0, 1.0, fract(value));
  return mix(random1d(i), random1d(i + 1.0), f);
}

float random2d(vec2 value){
  return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 createColor(vec2 position, vec3 waveData){
  vec3 color1 = vec3(
    noise1d(position.x * abs(cos(time * 0.5)) * 10.0), 
    noise1d(position.y * abs(sin(time * 0.5)) * 10.0), 
    1.0
  );
  vec3 color2 = mix(
    vec3(0.3647, 0.5765, 0.9686), 
    vec3(0.251, 0.9529, 0.8941), 
    position.y
    );
  
  return mix(color1, color2, smoothstep(0.8, 0.9, waveData));
}

void main(void){
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 position = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  vec3 waveData = wave(position);
  vec3 color = createColor(position, waveData);
  gl_FragColor = vec4(color , 1.0);
}