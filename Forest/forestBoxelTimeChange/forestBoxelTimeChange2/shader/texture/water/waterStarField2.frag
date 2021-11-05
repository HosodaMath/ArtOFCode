precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
varying vec4 vertTexCoord;
const float PI = 3.1415926535897932;
const float PI2 = 6.28318530718;
const float TAU = 6.28318530718;


vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + uTime * TAU);
  coord.x += 0.0015 * cos(coord.y * 250.0 + uTime * TAU);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * TAU);
  coord.y += 0.0015 * cos(coord.y * 250.0 + uTime * TAU);
  
  return coord;
}

// starWorldの作成
vec3 fade(vec3 v){
  return vec3(1.0, 1.0, 1.0);
}

vec2 rotate(vec2 position, float radian){
  float cs = cos(radian);
  float sn = sin(radian);

  return position * mat2(cs, -sn, sn, cs);
}

float random(vec3 value){
  return fract(sin(dot(value, vec3(12.9898, 78.233, 19.8321))) * 43758.5453);
}

float noise(vec3 value){
  vec3 i = floor(value);
  vec3 f = smoothstep(0.0, 1.0, fract(value));
  float color1 = 	mix(
		mix(random(i), random(i + vec3(1.0, 0.0, 0.0)), f.x),
		mix(random(i + vec3(0.0, 1.0, 0.0)), random(i + vec3(1.0, 1.0, 0.0)), f.x),
		f.y
	);
  float color2 = mix(
		mix(random(i + vec3(0.0, 0.0, 1.0)), random(i + vec3(1.0, 0.0, 1.0)), f.x),
		mix(random(i + vec3(0.0, 1.0, 1.0)), random(i + vec3(1.0, 1.0, 1.0)), f.x),
		f.y
	);
  return mix(color1,color2,f.z);
}

float fbm(vec3 value){
  float result = 0.0;
  float amp = 0.5;
  for(int i = 0; i < 5; i++){
    result += amp * noise(value);
    value *= 2.01;
    amp *= 0.5;
  }

  return result;
}

vec4 randomizer4(const vec4 x){
  vec4 z = mod(x, vec4(5612.0));
  z = mod(z, vec4(3.1415927 * 2.0));

  return (fract(cos(z) * vec4(56812.5453)));
}

const float A = 1.0;
const float B = 57.0;
const float C = 113.0;
const vec3 ABC = vec3(A, B, C);
const vec4 A3 = vec4(0, B, C, C + B);
const vec4 A4 = vec4(A, A + B, C + A, C + A + B);

float cnoise4(const in vec3 xx){
  vec3 x = mod(xx + 32768.0, 65536.0);
  vec3 ix = floor(x);
  vec3 fx = fract(x);
  vec3 wx = fx * fx * (3.0 - 2.0 * fx);
  float nn = dot(ix, ABC);

  vec4 N1 = nn + A3;
  vec4 N2 = nn + A4;
  vec4 R1 = randomizer4(N1);
  vec4 R2 = randomizer4(N2);
  vec4 R = mix(R1, R2, wx.x);
  float re = mix(mix(R.x, R.y, wx.y), mix(R.z, R.w, wx.y), wx.z);

  return 1.0 - 2.0 * re;
}

float surface3(vec3 coord, float frequency){
  float n = 0.0;

  n += 1.0 * abs(cnoise4(coord * frequency));
  n += 0.5 * abs(cnoise4(coord * frequency * 2.0));
  n += 0.25 * abs(cnoise4(coord * frequency * 4.0));
  n += 0.125 * abs(cnoise4(coord * frequency * 8.0));
  n += 0.0625 * abs(cnoise4(coord * frequency * 16.0));

  return n;
}



vec3 starFeild(vec2 position2, float radian, vec3 bgColor){
  const float starSize = 2.0; 
  float grad = 0.0;
  vec3 color = vec3(0.0, 0.0, 0.0);
  float fade = 0.0;
  float z = 0.0;
  vec2 centered_coord = position2 - vec2(sin(uTime * 0.1), sin(uTime * 0.1));
  centered_coord = rotate(centered_coord, radian);

  for(float i = 1.0; i <= 60.0; i++){
    vec2 starPosition = vec2(sin(i) * 250.0, sin(i * i * i) * 250.0);
    float z = mod(i * i - 10.0 * uTime, 256.0);
    float fade = (256.0 - z) / 256.0;
    vec2 blob_coord = starPosition / z;
    grad += ((fade / 384.0) / pow(length(centered_coord - blob_coord), starSize) * fade );
  }

  bgColor += grad;

  return bgColor;
}

vec3 createNebura(vec2 position, float radian){
  //vec2 position = gl_FragCoord.xy / resolution.xy;
  position += rotate(position, radian);

  mat3 matrix1 = mat3(1.0, 0.0, 0.0, 0.0,  0.8, 0.6, 0.0, -0.6, 0.8);
  mat3 matrix2 = mat3(1.0, 0.0, 0.0, 0.0,  0.8, 0.6, 0.0, -0.6, 0.8);
  float n = surface3(vec3(position * sin(uTime * 0.1), cos(uTime * 0.05)) * matrix1, 0.9);
  float n2 = surface3(vec3(position * cos(uTime * 0.1), cos(uTime * 0.04)) * matrix2 , 0.8);
  float lumminence = length(n);
  float lumminence2 = length(n2);

  vec3 tc = pow(vec3(1.0 - lumminence), vec3(sin(position.x) + cos(uTime) + 4.0, 8.0 + sin(uTime) + 4.0, 8.0));
  vec3 tc2 = pow(vec3(1.1 - lumminence2), vec3(5.0, position.y + cos(uTime) + 7.0, sin(position.x) + sin(uTime) + 2.0));

  vec3 bgColor = (tc * 0.8) + (tc2 * 0.5);

  return bgColor;
}

vec3 createWarter(vec2 position){
  vec3 color = vec3(
    0.2, 
    fbm(vec3(position * 10.0, abs(sin(uTime * 0.5)))), 
    1.0);

  vec2 q = vec2(0.0);
  q.x = fbm(vec3(position * 10.0, abs(cos(uTime * 0.5))));
  q.y = fbm(vec3(position * 10.0, abs(sin(uTime * 0.5))));

  vec2 r = vec2(0.0);
  r.x = fbm(vec3(position + 1.0 * q + vec2(1.7, 9.2), 0.15 * uTime));
  r.y = fbm(vec3(position + 1.0 * q + vec2(8.3, 2.8), 0.126 * uTime));

  float f = fbm(vec3(position + q, uTime * 0.1));

  color = mix(
    vec3(0.2431, 0.0745, 0.4), 
    vec3(0.3961, 0.1843, 0.5922), 
    clamp((f * f) * 4.0, 0.0, 1.0)
  );

  color = mix(
    color, 
    vec3(0.025, 0.035, 0.5), 
    clamp(length(q), 0.0, 1.0)
  );

  color = mix(
    color, 
    vec3(0.102, 0.6706, 1.0), 
    clamp(length(r.x), 0.0, 1.0)
  );

  vec3 calcColor = vec3(f * f * f + 0.6 * f * f + 0.5 * f) * color;

  return calcColor;
}

void main(){
  vec4 locationCoord = vertTexCoord;
  vec2 coord = vec2(locationCoord.x, locationCoord.y);
  coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);

  vec2 position = vec2(locationCoord.x, locationCoord.y);
  position = gl_FragCoord.xy / uResolution.xy;

   float radian = radians(uTime * 3.15);
  vec2 coord10 = coord;
  coord10 *= 10.0;
  vec3 seaColor = createWarter(coord10);
  float scale = sin(0.3 * uTime) + 5.0;

  vec2 position2 = vec2(locationCoord.x, locationCoord.y);
  position2 = (((gl_FragCoord.xy / uResolution) - 0.5) * scale);

  vec4 neburaColor = vec4(createNebura(position, radian), 1.0);
  vec4 starFeildColor = vec4(starFeild(position2, radian, seaColor), 1.0);

  neburaColor += starFeildColor;

  gl_FragColor = neburaColor;
}