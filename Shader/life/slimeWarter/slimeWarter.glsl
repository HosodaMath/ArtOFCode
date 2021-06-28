precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
const float PI2 = 6.28318530718;
const float PI = 3.141592653589793;

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

// fbm(フラクタルブラウン運動)
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


// 波のエフェクト
vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  
  return coord;
}

// 円を描画
float gCircle(vec2 position, float radius){
  return length(position) - radius;
}

// 平行移動
vec2 translate(vec2 position, vec2 offset){
  return position - offset;
}

// なめらかに結合
float gSmoothUnion(float d1, float d2, float k){
  return -log2(exp2(-k * d1) + exp2(-k * d2)) / k;
}

// メタボール
vec3 metaballColor(vec2 position){
  vec3 color = vec3(0.0, 1.0, 0.749);

  return color;
}

// 背景を描画
vec3 background(vec2 position){
   vec3 color = vec3(
    fbm(vec3(position * 10.0, abs(cos(time * 0.5)))), 
    fbm(vec3(position * 10.0, abs(sin(time * 0.5)))), 
    1.0);

  return color;
}

vec3 create(vec2 position){
  position *= 10.0;
  float d = 1e6;
  for(float i = 1.0; i <= 10.0; i++){
    float j = i;
    vec2 offset = vec2(0.0, 0.0);
    // translateで移動するための座標定義
    offset.x = 8.0 * cos(2.0 * random(vec3(i * 10.0, j * 10.0, 2.0)) * time);
    offset.y = 5.0 * sin(2.0 * random(vec3(i * 10.0, j * 10.0, 1.0)) * time);
    float radius = mix(0.5, 2.0, noise(vec3(i * 100.0, j * 100.0, 1.0)));
    float circle = gCircle(translate(position, offset), radius);
    d = gSmoothUnion(d, circle, 4.0);
  }

  vec3 metaball_color = metaballColor(position);
  
  vec3 background_color = background(position);
  
  vec3 color = mix(
    metaball_color, 
    background_color,
    smoothstep(-0.05, 0.05, d)
  );

  return color;
}

void main(){
  vec2 coord = gl_FragCoord.xy / min(resolution.x, resolution.y);
  vec2 position = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  
  position = wave_effect(position);

  vec3 color = create(position);
  gl_FragColor = vec4(color, 1.0);
}