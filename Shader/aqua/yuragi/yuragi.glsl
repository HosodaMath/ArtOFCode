precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
#define PI2 6.28318530718

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

// リングを生成
float ring(vec2 coord){
  float dest = 0.0;
  for(float x = 0.0; x < 10.0; x++){
    float y = x + 0.11;
    float s = cos((time * fbm(coord)) * y);
    float c = sin((time * fbm(coord)) * y);
    vec2 q = coord + vec2(s, c) * 0.3;
    // ここだと形か崩れるようになる
    dest += 0.01 / abs(length(q) - 0.5);
  }
  
  return dest;
}

vec3 createSea(vec2 coord){
  vec3 color1 = vec3(0.0392, 0.1137, 0.2784);
  vec3 color2 = vec3(0.3529, 0.5882, 0.7451);
  vec3 sea = mix(color1, color2, coord.y);
  return sea;
}

vec3 create(vec2 coord){


  vec3 color1 = createSea(coord);
  vec3 color2 = vec3(0.3765, 0.749, 1.0);
  vec3 color = mix(color1, color2, ring(coord));

  return color;
}

void main(){
  vec2 coord = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  coord.x += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  vec3 color = create(coord);  
  gl_FragColor = vec4(color, 0.0);
}

/*
Smoothstep
#define PI2 6.28318530718

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

// リングを生成
float ring(vec2 coord){
  float dest = 0.0;
  for(float x = 0.0; x < 10.0; x++){
    float y = x + 0.11;
    float s = cos((iTime * fbm(coord)) * y);
    float c = sin((iTime * fbm(coord)) * y);
    vec2 q = coord + vec2(s, c) * 0.3;
    // ここだと形か崩れるようになる
    dest += 0.01 / abs(length(q) - 0.5);
  }
  
  return dest;
}

vec3 createSea(vec2 coord){
  vec3 color1 = vec3(0.0392, 0.1137, 0.2784);
  vec3 color2 = vec3(0.3529, 0.5882, 0.7451);
  vec3 sea = mix(color1, color2, coord.y);
  return sea;
}

vec3 create(vec2 coord){


  vec3 color1 = createSea(coord);
  vec3 color2 = vec3(0.3765, 0.749, 1.0);
  vec3 color = mix(color1, color2, ring(coord));

  return color;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  
  // Compute coordinates that range from x = 0 to 1 and y = 0 to 1.
  vec2 uv = fragCoord / iResolution.xy;

 vec2 coord = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
  coord.x += 0.0035 * sin(coord.y * 100.0 + iTime * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + iTime * PI2);
  vec3 color = create(coord);  
  fragColor = vec4(color, 0.0);
}
*/