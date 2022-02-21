precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vTexCoord;
const float PI = 3.14159265359;
const float PI2 = 6.28318530718;

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
  const int Max = 5;
  float result = 0.0;
  float amp = 0.5;
  for(int i = 0; i < Max; i++){
    result += amp * noise(value);
    value *= 2.01;
    amp *= 0.5;
  }

  return result;
}

vec2 waveEffect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}

float createCircle(vec2 coord2, vec2 position){
  return length(coord2 - position);
}

vec3 createBuble(vec2 coord2){
  const int bubleMax = 64;
  vec3 bubleColor = vec3(0.0, 0.0, 0.0);
  for(int i = 0; i < bubleMax; i++){
    float pha = sin(float(i) * 546.13 + 1.0) * 0.5 + 0.5;
    float siz = pow(sin(float(i) * 651.74 + 5.0) * 0.5 + 0.5, 4.0);
    float pox = sin(float(i) * 321.55 + 4.1) * uResolution.x / uResolution.y; 
    
    // circle
    float radius = 0.025 + 0.025 * siz + sin(uTime * 0.06 + pha * 500.0 + siz) * 0.03;
    vec2 position = vec2(pox + sin(uTime * 0.1 + pha + siz), -1.0 - radius + (2.0 + 2.0 * radius) * mod(pha + 0.1 * (uTime / 5.0) * (0.2 + 0.8 * siz), 1.0));
    float circle = createCircle(coord2, position);
    
    // colors
    vec3 color1 = vec3(0.05, 0.15, 0.65);
    vec3 color2 = vec3(0.05, 0.3, 0.85 * sin(uTime * 0.09));
    float mixColor = 0.5 * 0.5 * sin(float(i) * 1.2 + 1.9);
    vec3 color = mix(color1,color2, mixColor);

    float f = length(coord2 - position) / radius;
    f = sqrt(clamp(1.0 + (sin((uTime * 0.07) + pha * 500.0 + siz) * 0.5) -f * f, 0.0, 1.0));
    bubleColor += color.xyz * (1.0 - smoothstep(radius * 0.85, radius, circle)) * f;
  }

  return bubleColor;
}

void main(void){

  vec3 p = vec3(gl_FragCoord.xy * 10.0 / uResolution.y, uTime * 0.25);
  vec4 bgColor = vec4(fbm(p) / 2.0 + 0.5);

  // vec2 coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y); 
  vec2 coord = vTexCoord;

  vec4 colorData1 = vec4(0.00, 0.00, 0.2, 1.0);
  vec4 colorData2 = vec4(0.1, 0.1, 0.0, 1.0);
  vec4 seaColor = mix(colorData1, colorData2, coord.y);

  vec2 coord2 = -1.0 + 2.0 * gl_FragCoord.xy / uResolution.xy;
  coord2.x *= uResolution.x / uResolution.y;
  vec4 bubleColor = vec4(createBuble(coord2), 1.0);

  bgColor += seaColor;
  bgColor += bubleColor;

  gl_FragColor = bgColor;
}