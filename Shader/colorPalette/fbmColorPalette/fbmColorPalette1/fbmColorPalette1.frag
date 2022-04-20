precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

varying vec4 vTexCoord;
varying vec3 vNormal;

const float PI = 3.141592653589793;
const float PI2 = 6.283185307179586;
const float TAU = PI2;
const float timeSlow = 0.5;

vec2 waveEffect(vec2 uv){
  uv.x += 0.0035 * cos(uv.x * 100.0 + uTime * TAU);
  uv.x += 0.0015 * cos(uv.x * 250.0 + uTime * TAU);
  
  uv.y += 0.0035 * sin(uv.y * 100.0 + uTime * TAU);
  uv.y += 0.0015 * sin(uv.y * 250.0 + uTime * TAU);
  
  return uv;
}

vec3 fade(vec3 x){
  vec3 result = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);

  return result;
}

vec3 phash(vec3 p){
  p = fract(mat3(1.2989833, 7.8233198, 2.3562332,
                  6.7598192, 3.4857334, 8.2837193,
                   2.9175399, 2.9884245, 5.4987265) * p);
    p = ((2384.2345 * p - 1324.3438) * p + 3884.2243) * p - 4921.2354;
    return normalize(fract(p) * 2.0 - 1.0);
}

float noise(vec3 p)
{
    vec3 ip = floor(p);
    vec3 fp = fract(p);
    float d000 = dot(phash(ip), fp);
    float d001 = dot(phash(ip + vec3(0.0, 0.0, 1.0)), fp - vec3(0.0, 0.0, 1.0));
    float d010 = dot(phash(ip + vec3(0.0, 1.0, 0.0)), fp - vec3(0.0, 1.0, 0.0));
    float d011 = dot(phash(ip + vec3(0.0, 1.0, 1.0)), fp - vec3(0.0, 1.0, 1.0));
    float d100 = dot(phash(ip + vec3(1.0, 0.0, 0.0)), fp - vec3(1.0, 0.0, 0.0));
    float d101 = dot(phash(ip + vec3(1.0, 0.0, 1.0)), fp - vec3(1.0, 0.0, 1.0));
    float d110 = dot(phash(ip + vec3(1.0, 1.0, 0.0)), fp - vec3(1.0, 1.0, 0.0));
    float d111 = dot(phash(ip + vec3(1.0, 1.0, 1.0)), fp - vec3(1.0, 1.0, 1.0));
    fp = fade(fp);
    return mix(mix(mix(d000, d001, fp.z), mix(d010, d011, fp.z), fp.y),
              mix(mix(d100, d101, fp.z), mix(d110, d111, fp.z), fp.y), fp.x);
}

float fbm(vec3 value){
  const int loopMax = 5;
  float ans = 0.0;
  float amp = 0.5;
  for(int i = 0; i < loopMax; i++){
    ans += amp * noise(value);
    value *= 2.01;
    amp *= 0.5;
  }

  return ans;
}

float circle(vec2 uv, float radius){
  return length(uv) - 0.5;
}

float rect(vec2 uv, vec2 size){
  uv = abs(uv) - size;
  return length(max(uv, 0.0)) + min(max(uv.x, uv.y), 0.0);
}

/*
  color(t) = a + b * cos(2pi(c * t + d))
*/
vec3 palette1(vec3 a, vec3 b, vec3 c, vec3 d, float t){
  return a + b * cos(TAU * (c * t + d));
}

/*
  color(t) = a + b * sin(2pi(c * t + d))
*/
vec3 palette2(vec3 a, vec3 b, vec3 c, vec3 d, float t){
  return a + b * sin(TAU * (c * t + d));
}


void main(void){

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

  float ring = 1.0 / abs(length(uv) - 0.5);

  vec3 color1 = palette2(
    vec3(1.0, 1.0, 0.5), 
    vec3(0.5, 0.5, 0.5), 
    vec3(1.0, 1.0, 1.0), 
    vec3(0.0, 0.333, 0.666),
    ring
  );

  vec3 color2 = palette2(
    vec3(1.0, 0.5, 0.5), 
    vec3(0.5, 0.5, 0.5), 
    vec3(1.0, 1.0, 1.0), 
    vec3(0.0, 0.333, 0.666), 
    ring
  );


  vec3 p = vec3(gl_FragCoord.xy * 10.0 / uResolution.y, uTime * 0.25);
  vec3 bgColor = vec3(fbm(p) / 2.0 + 0.5);
  bgColor += mix(color1, color2, length(uv));

  
  vec3 mainColor = mix(color1, color2, length(uv)); 
  float d = smoothstep(-0.5, 0.5, circle(uv, 0.5));
  vec3 color = mix(mainColor, bgColor, d);

  gl_FragColor = vec4(color, 1.0);
}