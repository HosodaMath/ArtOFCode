precision highp float;
precision highp int;
uniform vec2 uResolution;
// uniform vec2 uMouse;
uniform float uTime;

varying vec4 vertColor;
varying vec4 vertTexCoord;

#define PI2 6.28318530718

// 座標変換
vec2 rotateLoop(vec2 coord, float radian){
  const int iter = 5;
  for(int i = 0; i < iter; i++){
    coord = abs(coord * 1.5) - 1.0;
    float a = radian * float(i);
    float c = cos(a);
    float s = sin(a);
    coord *= mat2(c, s, -s, c);
  }

  return coord;
}

// 乱数生成
float random(vec2 value){
  return fract(sin(dot(value, vec2(12.9898, 78.233))) * 43758.5453);
}

// ノイズ 多種多様な生成
float noise(vec2 value){
  vec2 i = floor(value);
  //vec2 f = fract(value);
  vec2 f = smoothstep(0.0, 1.0, fract(value));

  //float a = random(i);
  //float b = random(i + vec2(1.0, 0.0));
  //float c = random(i + vec2(0.0, 1.0));
  //float d = random(i + vec2(1.0, 1.0));

  //vec2 u = f * f * (3.0 - 2.0 * f);
  
  float mix1 = mix(random(i), random(i + vec2(1.0, 0.0)), f.x);
  float mix2 = mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), f.x);
  float valueMix = mix(mix1,mix2,f.y);
  //float valueMix = mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;

  return valueMix;
}

float fbm(vec2 value){
  const int octaves = 2;
  float result = 0.0;
  float amplitude = 0.5;
  for(int i = 0; i < octaves; i++){
    result += amplitude * noise(value);
    value += 2.0;
    amplitude += 0.5;
  }

  return result;
}

// bgColor用ジオメトリの生成
float bgGeometry(vec2 coord){
  const float LoopMax = 10.0;
  float dest = 0.0;
  float dest1 = 0.0;
  float dest2 = 0.0;
  for(float x = 0.0; x < LoopMax; x++){
    float y = x + 0.10;
    float s = cos((uTime * fbm(coord)) * y);
    float c = sin((uTime * fbm(coord)) * y);
    vec2 q = coord + vec2(s, c) * 0.2;

    // triangle
    vec2 t = abs(q);
    float size = 0.5;
    dest1 += 0.1 / max(t.x * 0.866025 + t.y * 0.5, -t.y * 0.5) - size * 0.5;

    // hexagon
    vec2 h = abs(q);
    float radius = 0.5;
    dest2 += 0.1 / max(abs(h.y), h.x * 0.866025 + h.y * 0.5) - radius;
  }

  return dest = dest1 + dest2 ;
}


// Morphine用ジオメトリ
vec2 circle(vec2 coord,float size){
  return vec2(length(coord), size);
}

vec2 polygon(vec2 coord, int vertex, float size){
  float a = atan(coord.x, coord.y) + 0.2;
  float b = 6.28319 / float(vertex);
  return vec2(cos(floor(0.5 + a / b) * b - a) * length(coord), size);
}

vec4 createSea(vec2 coord){

  vec4 color1 = vec4(0.1961, 0.1333, 0.4275, 1.0);
  vec4 color2 = vec4(0.4118, 0.3529, 0.7451, 1.0);
  vec4 sea = mix(color1, color2, coord.y);
  
  return sea;
}


vec4 createGeometry(vec2 coord){
  float geometry = bgGeometry(coord);
  vec4 color1 = vec4(0.0039, 0.0078, 0.2392, 1.0);
  vec4 color2 = vec4(0.102, 0.3529, 0.3412, 1.0);
  vec4 calcColor = mix(color1, color2, geometry);
  
  return calcColor;
}

vec4 createColor(vec2 coord){
  coord = rotateLoop(coord, uTime * 0.2);
  // bgColor
  vec4 bgColor = createSea(coord);

  // モーフィングを作成する
  float t = sin(uTime * 5.0) * 0.5 + 0.5;
  t *= 0.8;
  vec2 d = mix(circle(coord, 0.8), polygon(coord, 6,0.5), t);
  vec4 geometryColor = createGeometry(coord); 

  vec4 calcColor = mix(bgColor, geometryColor, step(d.x, d.y));

  return calcColor;
}

void main(){
vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);
  locationCoord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
  
  vec4 color = createColor(locationCoord);

  gl_FragColor = color;
}
