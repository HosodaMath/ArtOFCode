precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define PI2 6.28318530718

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

vec3 create(vec2 coord){
  vec2 q2 = coord;

  float s = sin(time * 0.05);
  float c = cos(time * 0.05);
  q2 *= mat2(c, s, -s, c);
  
  float red = 0.0;
  float green = 0.5 / abs(tan(q2.x)) * abs(tan(q2.y));
  float blue = fbm(vec2(abs(tan(q2.x)), abs(tan(q2.y))));

  vec3 color = vec3(red, green, blue);

  return color;
}

void main(){
  vec2 coord = (10.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  
  coord.x += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  vec3 color = create(coord);
  
  gl_FragColor = vec4(color, 1.0);
}