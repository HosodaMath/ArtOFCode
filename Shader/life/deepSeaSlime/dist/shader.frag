precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
// 頂点シェーダーからデータを受け取る
varying vec2 vTexCoord;
const float PI2 = 6.28318530718;
const float PI = 3.141592653589793;

// Teamplate 
// まだ作成段階😔

// 回転
vec2 rotate(vec2 position, float radian){ 
  float c = cos(-radian);
  float s = sin(-radian);

  return mat2(c, s, -s, c) * position;
}

// 拡大縮小
vec2 scale(vec2 position, vec2 rate){
  return position / rate;
}

// 平行移動
vec2 translate(vec2 position, vec2 offset){
  return position - offset;
}

// 乱数を生成
float random(vec3 value){
  return fract(sin(dot(value, vec3(12.9898, 78.233, 19.8321))) * 43758.5453);
}

// 繰り返し
vec2 repeat(vec2 position, vec2 size){
  return mod(position, 2.0 * size) - size;
}

// 結合
float gUnion(float d1, float d2){
  return min(d1, d2);
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

// fractal brown motion
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

// 円を描く
float gCircle(vec2 position, float radius){
  return length(position) - radius;
}

// 波のエフェクト
vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  
  return coord;
}

vec3 create(vec2 coord){
  vec2 position = coord;
  position *= 10.0;
  float d = 1e6;
  for(float i = 1.0; i <= 10.0; i++){
    float j = i;
    vec2 offset = vec2(0.0, 0.0);
    offset.x = 8.0 * cos(2.0 * fbm(vec3(i * 10.0, j * 10.0, 2.0)) * time * cos(coord.x));
    offset.y = 5.0 * sin(2.0 * fbm(vec3(i * 10.0, j * 10.0, 1.0)) * time * sin(coord.y));
    float radius = mix(0.5, 2.0, noise(vec3(i * 100.0, j * 100.0, 1.0)));
    float circle = gCircle(translate(position, offset), radius);
    d = gUnion(d, circle);
  }

  float r = fbm(vec3(coord.x, coord.y, time * 0.2));
  float b = fbm(vec3(coord.x, coord.y, time * 0.2));
  
  vec3 color1 = vec3(r, 1.0, b);
  vec3 color2 = vec3(0.0, 0.0, b);

  vec3 color = mix(color1, color2, smoothstep(-0.005, 0.005, d));

  return color;
}


void main() {
  vec2 coord = vTexCoord;
  coord = (1.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  coord = wave_effect(coord);

  vec3 color = create(coord);
  gl_FragColor = vec4(color, 1.0);
}