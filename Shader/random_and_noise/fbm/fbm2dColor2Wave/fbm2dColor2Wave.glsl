precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define PI 3.141592653589793
#define TWO_PI 6.283185307179586

float random(vec2 value){
  return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 value){
  vec2 i = floor(value);
  vec2 f = smoothstep(0.0, 1.0, fract(value));
  float mix1 = mix(random(i), random(i + vec2(1.0, 0.0)), f.x);
  float mix2 = mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), f.x);
  
  return mix(mix1,mix2,f.y);
}

float fbm(vec2 value){
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

vec3 createColor(vec2 p, vec2 uv){

  vec3 color1 = vec3(0.0, 0.0550, 0.2390);
  vec3 color2 = vec3(fbm(p * 2.0), fbm(p * 2.0), abs(cos(time * 0.5)));
  vec3 color = mix(color1, color2, wave(uv));
  return color;
}

void main(){
  vec2 p = gl_FragCoord.xy / resolution;
  vec2 uv = (10.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  vec3 color = createColor(p, uv);
  gl_FragColor = vec4(color, 1.0);
}