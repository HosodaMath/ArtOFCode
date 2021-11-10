precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

#define PI2 6.28318530718

vec2 waveEffect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}

vec3 fade(vec3 v){
  return vec3(1.0, 1.0, 1.0);
}

vec2 rotate(vec2 position, float radian){
  float cs = cos(radian);
  float sn = sin(radian);

  return position * mat2(cs, -sn, sn, cs);
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

vec4 starFeild(vec2 position2, float radian, vec4 background_color){
  float grad = 0.0;
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
  float fade = 0.0;
  float z = 0.0;
  vec2 centered_coord = position2 - vec2(sin(uTime * 0.1), sin(uTime * 0.1));
  centered_coord = rotate(centered_coord, radian);

  for(float i = 1.0; i <= 60.0; i++){
    vec2 star_position = vec2(sin(i) * 250.0, sin(i * i * i) * 250.0);
    float z = mod(i * i - 10.0 * uTime, 256.0);
    float fade = (256.0 - z) / 256.0;
    vec2 blob_coord = star_position / z;
    grad += ((fade / 384.0) / pow(length(centered_coord - blob_coord), 2.5) * fade );
  }

  background_color += grad;

  return background_color;
}

vec4 createWarter(vec2 position){
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
    vec3(0.102, 0.298, 0.6667), 
    vec3(0.4, 0.4314, 0.902), 
    clamp((f * f) * 4.0, 0.0, 1.0)
  );

  color = mix(
    color, 
    vec3(0.0235, 0.1765, 0.502), 
    clamp(length(q), 0.0, 1.0)
  );

  color = mix(
    color, 
    vec3(0.102, 0.2353, 1.0), 
    clamp(length(r.x), 0.0, 1.0)
  );
  
  vec4 calcColor = vec4(vec3(f * f * f + 0.6 * f * f + 0.5 * f) * color, 1.0);

  return calcColor;
}

void main(){
  vec2 coord = vertTexCoord.xy;
  coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
  coord = waveEffect(coord);
  

  float radian = radians(uTime * 3.15);
  vec4 background_color = vec4(0.4902, 0.5412, 1.0, 1.0);
  float scale = sin(0.3 * uTime) + 5.0;
  vec2 position2 = (((gl_FragCoord.xy / uResolution) - 0.5) * scale);
  position2 = waveEffect(position2);
  
  vec4 starFieldColor = starFeild(position2, radian, background_color);

  vec2 position = coord;
  position *= 10.0;
  vec4 warterColor = createWarter(position);

  float intensity = max(0.0, dot(vertNormal, vertLightDir));
  vec4 shadowColor;
  if(intensity > 0.95){
    shadowColor = vec4(0.7843, 0.7804, 1.0, 1.0);
    shadowColor += warterColor * starFieldColor;
  } else if(intensity > 0.5){
    shadowColor = vec4(0.4824, 0.4745, 0.9216, 1.0);
    shadowColor += warterColor * starFieldColor;
  }  else if(intensity > 0.25){
    shadowColor = vec4(0.2549, 0.2471, 0.8392, 1.0);
    shadowColor += warterColor * starFieldColor;
  } else {
    shadowColor = vec4(0.1569, 0.1529, 0.4196, 1.0);
    shadowColor += warterColor * starFieldColor;
  }

  gl_FragColor = shadowColor;
}