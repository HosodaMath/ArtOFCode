precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
varying vec2 vTexCoord;
const float PI2 = 6.28318530718;
const float PI = 3.141592653589793;

float random(vec2 value){
  return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 value){
  vec2 i = floor(value);
  vec2 f = smoothstep(0.0, 1.0, fract(value));
  float mix1 = mix(random(i), random(i + vec2(1.0, 0.0)), f.x);
  float mix2 = mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), f.x);

  return mix(mix1, mix2, f.y);  
}

float fbm(vec2 value){
  float result = 0.0;
  float amp = 0.5;
  for(int i = 0; i < 5; i++){
    result += amp * noise(value);
    value *= 2.0;
    amp *= 0.5;
  }

  return result;
}

vec3 fade(vec3 v){
  return vec3(1.0, 1.0, 1.0);
}

vec2 rotate(vec2 position, float radian){
  float cs = cos(radian);
  float sn = sin(radian);

  return position * mat2(cs, -sn, sn, cs);
}

vec3 starFeild(vec2 position2, float radian, vec3 background_color){
  float grad = 0.0;
  float fade = 0.0;
  float z = 0.0;
  vec2 centered_coord = position2 - vec2(cos(time * 0.1), sin(time * 0.1));
  centered_coord = rotate(centered_coord, radian);

  for(float i = 1.0; i <= 100.0; i++){
    vec2 star_position = vec2(cos(i) * 250.0, sin(i * i * i) * 250.0);
    float z = mod(i * i - 10.0 * time, 256.0);
    float fade = (256.0 - z) / 256.0;
    vec2 blob_coord = star_position / z;
    grad += ((fade / 384.0) / pow(length(centered_coord - blob_coord), 1.5) * fade );
  }

  background_color += grad;

  return background_color;
}

void main(){
  vec2 coord = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  
  float radian = radians(time * 3.15);
  
  float b = fbm(vec2(coord.x, coord.y));
  vec3 background_color = vec3(0, 0, b);
  
  float scale = tan(0.3 * time) + 5.0;
  vec2 position2 = (((gl_FragCoord.xy / resolution) - 0.5) * scale);
  
  vec3 star_field = starFeild(position2, radian, background_color);

  gl_FragColor = vec4(star_field, 1.0);
}