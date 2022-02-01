precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
varying vec2 vTexCoord;
const float PI = 3.14159265359;
const float PI2 = 6.28318530718;

// 波のエフェクト
vec2 waveEffect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}

// 背景色
vec3 background(vec2 position){
  vec3 color = mix(
    vec3(0.0078, 0.0235, 0.2863), 
    vec3(0.3059, 0.3333, 0.7882), 
    position.y
  );
  return color;
}

vec2 rotate(vec2 position, float radian){
  float c = cos(-radian);
  float s = sin(-radian);
  vec2 calc = mat2(c, s, -s, c) * position;

  return calc;
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

// フラクタルブラウン運動
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

// 球体を描く
float GSphere(vec3 position, float radius){
  return length(position) - radius;
}

// ボックスを描く
float GBox(vec3 position, vec3 size){
  vec3 d = abs(position) - size;

  return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0);
}

float GTrous(vec3 position){
  vec2 size = vec2(0.75, 0.25);
  vec2 radius = vec2(length(position.xy) - size.x, position.z);

  return length(radius) - size.y;
} 

// 繰り返しで球体とBoxを配置する
float map(vec3 position){
  position = mod(position, 5.0) - 2.5;
  
  position.x += cos(uTime * 0.5);
  position.y += sin(uTime * 0.5);
  
  // float radius = 1.0;
  float radius = abs(cos(uTime * 0.5));
  float sphere = GSphere(position, radius);

  vec3 size = vec3(1.0, 1.0, 1.0);
  float torus = GTrous(position);

  float t = sin(uTime * 5.0) * 0.5 + 0.5;
  float d = mix(sphere, torus, t);

  return d;
}

// 正規化計算
vec3 calcNormal(vec3 position){
  float e = 0.01;
  float mapping1 = map(position + vec3(e, 0.0, 0.0)) - map(position - vec3(e, 0.0, 0.0));
  float mapping2 = map(position + vec3(0.0, e, 0.0)) - map(position - vec3(0.0, e, 0.0));
  float mapping3 = map(position + vec3(0.0, 0.0, e)) - map(position - vec3(0.0, 0.0, e));

  return normalize(vec3(mapping1, mapping2, mapping3));
}

// レイマーチング
vec3 raymarch(vec3 ro, vec3 rd, vec2 coord){
  const int LoopMax = 64;
  vec3 position = ro;
  for(int i = 0; i < LoopMax; i++){
    float d = map(position);
    position += d * rd;
    if(d < 0.01){
      vec3 normal = calcNormal(position);

      return normal * 0.5 + 0.5;
    }
  }

  vec3 bgColor = background(coord);

  return bgColor;
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
    vec3(0.2039, 0.602, 0.6667), 
    vec3(0.4, 0.6, 0.9), 
    clamp((f * f) * 4.0, 0.0, 1.0)
  );

  color = mix(
    color, 
    vec3(0.025, 0.035, 0.5), 
    clamp(length(q), 0.0, 1.0)
  );

  color = mix(
    color, 
    vec3(0.1, 1.0, 0.5), 
    clamp(length(r.x), 0.0, 1.0)
  );

  vec4 calcColor = vec4(vec3(f * f * f + 0.6 * f * f + 0.5 * f) * color, 1.0);

  return calcColor;
}

void main(){
  vec2 coord = vTexCoord;
  // coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
  coord = waveEffect(coord);
  coord = rotate(coord, uTime * 0.05);
  vec3 ro = vec3(10.0 * vec2(0.5, 0.5) - 5.0, - uTime);
  vec3 ta = vec3(0.0, 0.0, -5.0 - uTime);


  vec3 normalColor = vec3(0.8667, 1.0, 0.3765);
  vec3 cameraZ = normalize(ta - ro);
  vec3 cameraX = normalize(cross(cameraZ, normalColor));
  vec3 cameraY = cross(cameraX, cameraZ);

  vec3 rd = normalize(cameraX * coord.x + cameraY * coord.y + 1.5 * cameraZ);
  
  vec4 raymarchColor = vec4(vec3(raymarch(ro, rd, coord)), 1.0);

  vec2 coord10 = coord * 10.0;
  vec4 waterColor = createWarter(coord10);

  raymarchColor += waterColor;

  gl_FragColor = raymarchColor;
}