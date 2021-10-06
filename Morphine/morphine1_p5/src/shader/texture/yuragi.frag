precision highp float;
//uniform vec2 uResolution;
// uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
varying vec2 vTexCoord;
#define PI2 6.28318530718

vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}

// 乱数生成
float random(vec2 value){
  return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
}

// ノイズ
float noise(vec2 value){
  vec2 i = floor(value);
  vec2 f = smoothstep(0.0, 1.0, fract(value));
  float mix1 = mix(random(i), random(i + vec2(1.0, 0.0)), f.x);
  float mix2 = mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), f.x);
  
  return mix(mix1,mix2,f.y);
}

// fractal brown motion
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

vec4 createSeaWorld(vec2 coord){
  vec4 texture1 = texture2D(uTexture1, coord);
  vec4 texture2 = texture2D(uTexture2, coord);
  vec4 seaWorld = mix(texture2, texture1, coord.y);

  return seaWorld;
}

void main(){
  vec2 coord = vTexCoord;
  //coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
  coord = wave_effect(coord);

  vec4 color = createSeaWorld(coord);

  gl_FragColor = color;
}