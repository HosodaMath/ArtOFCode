precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform float uTime;
const float alpha = 1.0;
const float PI2 = 6.28318530718;
const float TAU = PI2;

varying vec4 vTexCoord;
varying vec3 vNormal;



vec2 waveEffect(vec2 uv){
  uv.x += 0.0035 * sin(uv.x * 100.0 + uTime * TAU);
  uv.x += 0.0015 * cos(uv.x * 250.0 + uTime * TAU);
  
  uv.y += 0.0035 * sin(uv.y * 100.0 + uTime * TAU);
  uv.y += 0.0015 * cos(uv.y * 250.0 + uTime * TAU);
  
  return uv;
}

// 2次元乱数
float random2(vec2 value){
  return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
}


vec3 fade(vec3 x){
  vec3 result = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);

  return result;
}

// 3次元乱数
vec3 random3(vec3 p){
  p = fract(mat3(1.2989833, 7.8233198, 2.3562332,
                  6.7598192, 3.4857334, 8.2837193,
                   2.9175399, 2.9884245, 5.4987265) * p);
    p = ((2384.2345 * p - 1324.3438) * p + 3884.2243) * p - 4921.2354;
    return normalize(fract(p) * 2.0 - 1.0);
}

// 2次元ノイズ
float noise_value2(vec2 value){
  vec2 i = floor(value);
  vec2 f = smoothstep(0.0, 1.0, fract(value));
  float mix1 = mix(random2(i), random2(i + vec2(1.0, 0.0)), f.x);
  float mix2 = mix(random2(i + vec2(0.0, 1.0)), random2(i + vec2(1.0, 1.0)), f.x);
  
  return mix(mix1, mix2, f.y);
}

// 3次元ノイズ
float noise_value3(vec3 p)
{
    vec3 ip = floor(p);
    vec3 fp = fract(p);
    float d000 = dot(random3(ip), fp);
    float d001 = dot(random3(ip + vec3(0.0, 0.0, 1.0)), fp - vec3(0.0, 0.0, 1.0));
    float d010 = dot(random3(ip + vec3(0.0, 1.0, 0.0)), fp - vec3(0.0, 1.0, 0.0));
    float d011 = dot(random3(ip + vec3(0.0, 1.0, 1.0)), fp - vec3(0.0, 1.0, 1.0));
    float d100 = dot(random3(ip + vec3(1.0, 0.0, 0.0)), fp - vec3(1.0, 0.0, 0.0));
    float d101 = dot(random3(ip + vec3(1.0, 0.0, 1.0)), fp - vec3(1.0, 0.0, 1.0));
    float d110 = dot(random3(ip + vec3(1.0, 1.0, 0.0)), fp - vec3(1.0, 1.0, 0.0));
    float d111 = dot(random3(ip + vec3(1.0, 1.0, 1.0)), fp - vec3(1.0, 1.0, 1.0));
    fp = fade(fp);
    return mix(mix(mix(d000, d001, fp.z), mix(d010, d011, fp.z), fp.y),
              mix(mix(d100, d101, fp.z), mix(d110, d111, fp.z), fp.y), fp.x);
}

// 2次元フラクタルブラウン運動
float fbm2(vec2 value){
  float result = 0.0;
  float amp = 0.5;
  for(int i = 0; i < 5; i++){
    result += amp * noise_value2(value);
    value *= 2.01;
    amp *= 0.5;
  }

  return result;
}


// 3次元フラクタルブラウン運動
float fbm3(vec3 value){
  const int Max = 5;
  float result = 0.0;
  float amp = 0.5;
  for(int i = 0; i < Max; i++){
    result += amp * noise_value3(value);
    value *= 2.01;
    amp *= 0.5;
  }

  return result;
}


float ring(vec2 uv,float radius){
  float dest = 0.0;
  const float iter = 10.0;
  for(float x = 0.0; x < iter; x++){
    float y = x + 0.1;
    // 3次元ノイズを使うと重たくなる
    float s = cos((uTime * fbm2(uv)) * y);
    float c = sin((uTime * fbm2(uv)) * y);
    vec2 q = uv + vec2(c, s) * 0.3;
    dest += 0.01 / abs(length(q) - radius);
  }
  
  return dest;
}

/*
  color(t) = a + b * cos(2pi(c * t + d))
*/
vec3 palette1(vec3 a, vec3 b, vec3 c, vec3 d, float t){
  return a + b * cos(PI2 * (c * t + d));
}

/*
  color(t) = a + b * sin(2pi(c * t + d))
*/
vec3 palette2(vec3 a, vec3 b, vec3 c, vec3 d, float t){
  return a + b * sin(PI2 * (c * t + d));
}

void main(){
  bool centerFlag = true;

  vec2 uv = vec2(0.0);

  if(centerFlag == false){
    // 原点は画面左下
    uv = gl_FragCoord.xy / uResolution;
  } else {
    // 原点を画面中央にする -> 繰り返し回数が多くなる
    uv = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
  }

  uv = waveEffect(uv);

  vec3 color1 = palette2(
    vec3(0.5, 0.5, 0.5), 
    vec3(0.5, 0.5, 0.5), 
    vec3(1.0, 1.0, 1.0), 
    vec3(0.0, 0.333, 0.666),
    ring(uv, 0.2)
  );

  vec3 color2 = palette2(
    vec3(0.0, 0.5, 0.5), 
    vec3(0.0, 0.5, 0.5), 
    vec3(1.0, 1.0, 1.0), 
    vec3(0.0, 0.0, 0.2), 
    ring(uv, 0.5)
  );

  vec2 uv10 = gl_FragCoord.xy * 10.0 / uResolution.y;
  uv10 = waveEffect(uv10);
  vec3 p = vec3(uv10, uTime * 0.25);
  vec3 bgColor = vec3(fbm3(p) / 2.0 + 0.5);

  bgColor += mix(color1, color2, length(uv) - 0.5);
  
  gl_FragColor = vec4(bgColor, 1.0);
}