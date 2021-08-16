precision highp float;

uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform float uFrameCount;

varying vec2 vTexCoord;
#define PI2 6.28318530718
#define PI 3.141592653589793

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

vec2 wave_effect(vec2 coord){
  
  coord.x += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}

float ring(vec2 coord, float radius){
  float noiseValue1 = noise(vec3(2.0 * coord, 0.1 * (uTime * 0.005 - 1.0)));
  float noiseValue2 = noise(vec3(2.0 * coord, 0.1 * (uTime * 0.005 + 1.0)));
  
  float dest = 0.0;
  for(float x = 0.0; x < 10.0; x++){
    float y1 = x + noiseValue1;
    float y2 = x + noiseValue2;
    vec2 q = coord + vec2(
      cos(uTime * y1 * 0.005), 
      sin(uTime * y2 * 0.005)
    ) * 0.3;
    
    dest += 0.01 / abs(length(q) - radius);
  }
  // 原点からの距離を求める
  // float len = 0.01 / abs(length(coord) - 0.5);
  
  return dest;
}

vec3 createSea(vec2 coord){
  vec3 seaColor1 =vec3(0.0392, 0.051, 0.1725);
  vec3 seaColor2 = vec3(0.1294, 0.1451, 0.3725);
  float radius = clamp(abs(tan(uTime * 0.005)), 0.1, 0.5);
  vec3 color = mix(seaColor1, seaColor2, ring(coord, radius));

  return color;
}

void main(){
  vec2 coord = vTexCoord;
  coord = (1.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);

  coord = wave_effect(coord);

  vec3 color = createSea(coord);

  gl_FragColor = vec4(color,  1.0);
}