precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
varying vec4 vertTexCoord;
const float PI2 = 6.28318530718;
const float PI = 3.141592653589793;


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

float surface3(vec3 coord, float frequency){
  float n = 0.0;

  n += 1.0 * abs(fbm(coord * frequency));
  n += 0.5 * abs(fbm(coord * frequency * 2.0));
  n += 0.25 * abs(fbm(coord * frequency * 4.0));
  n += 0.125 * abs(fbm(coord * frequency * 8.0));
  n += 0.0625 * abs(fbm(coord * frequency * 16.0));

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
  position += rotate(position, radian);

  mat3 matrix1 = mat3(1.0, 0.0, 0.0, 0.0, 0.8, 0.6, 0.0, -0.6, 0.8);
  mat3 matrix2 = mat3(1.0, 0.0, 0.0, 0.0, 0.8, 0.6, 0.0, -0.6, 0.8);
  float n = surface3(vec3(position * sin(uTime * 0.1), cos(uTime * 0.05)) * matrix1, 0.9);
  float n2 = surface3(vec3(position * cos(uTime * 0.1), cos(uTime * 0.04)) * matrix2 , 0.8);
  float lumminence = length(n);
  float lumminence2 = length(n2);

  vec3 tc = pow(vec3(1.0 - lumminence), vec3(sin(position.x) + cos(uTime) + 4.0, 8.0 + sin(uTime) + 4.0, 8.0));
  vec3 tc2 = pow(vec3(1.1 - lumminence2), vec3(5.0, position.y + cos(uTime) + 7.0, sin(position.x) + sin(uTime) + 2.0));

  vec3 bgColor = (tc * 0.8) + (tc2 * 0.5);

  return bgColor;
}

void main(){
  vec4 locationCoord = vertTexCoord;
  vec2 coord = vec2(locationCoord.x, locationCoord.y);
  coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);

  vec2 position = vec2(locationCoord.x, locationCoord.y);
  position = gl_FragCoord.xy / uResolution.xy;

  float radian = radians(uTime * 3.15);
  vec3 color1 = vec3(0.0, 0.0, 0.0);
  vec3 color2 = vec3(0.0, 0.0, 0.35);
  vec3 bgColor = mix(color1, color2, position.y);
  float scale = sin(0.3 * uTime) + 5.0;

  vec2 position2 = vec2(locationCoord.x, locationCoord.y);
  position2 = (((gl_FragCoord.xy / uResolution) - 0.5) * scale);

  vec4 neburaColor = vec4(createNebura(position, radian), 1.0);
  vec4 starFeildColor = vec4(starFeild(position2, radian, bgColor), 1.0);

  neburaColor += starFeildColor;

  gl_FragColor = neburaColor;
}