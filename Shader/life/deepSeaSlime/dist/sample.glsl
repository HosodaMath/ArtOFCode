precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
varying vec2 vTexCoord;
const float PI2 = 6.28318530718;
const float PI = 3.141592653589793;


// 波のエフェクト
vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  
  return coord;
}

// 乱数を生成
float random(vec3 value){
  return fract(sin(dot(value, vec3(12.9898, 78.233, 19.8321))) * 43758.5453);
}

// ノイズを生成
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
    value *= 2.0;
    amp *= 0.1;
  }

  return result;
}

float circle(vec2 position, float radius){
  return length(position) - radius;
}

vec3 create(vec2 coord){
  vec2 position = coord;
  // x軸を動かす
  position.x += cos(time * 0.5);
  // y軸を動かす
  position.y += sin(time * 0.5);

  float radius = 0.2;
  float d = circle(position, radius);

  float b = fbm(vec3(coord.x, coord.y, time * 0.5));
  vec3 color1 = vec3(0.9922, 0.9843, b);
  vec3 color2 = vec3(0.0, 0.0, b);

  vec3 color = mix(color1, color2, smoothstep(-0.005, 0.005, d));

  return color;
}


void main() {
  vec2 coord = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  coord = wave_effect(coord);

  vec3 color = create(coord);
  gl_FragColor = vec4(color, 1.0);
}