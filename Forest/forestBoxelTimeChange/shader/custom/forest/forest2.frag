precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

varying vec4 vertTexCoord;

#define PI2 6.28318530718

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

// 乱数を生成
float random(vec3 value){
  return fract(sin(dot(value, vec3(12.9898, 78.233, 19.8321))) * 43758.5453);
}

//乱数2を生成
vec2 random2(vec2 value){
  return fract(sin(vec2(dot(value, vec2(127.1, 311.7)), dot(value, vec2(269.5, 183.3)))) * 43758.5453);
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

// ボロノイ
float voronoi(vec2 coord){
  coord = rotateLoop(coord, uTime * 0.2);
  vec2 baseCell = floor(coord);
  vec2 fst = fract(coord);
  float move_dist = 10.0;
  for(int x = -1; x <= 1; x++){
    for(int y = -1; y <= 1; y++){
      vec2 cell = vec2(float(x), float(y));
      vec2 point = random2(baseCell + cell);
      point = 0.5 + 0.5 * sin(6.2831 * point);
      vec2 diff = cell + point - fst;
      float cell_dist = length(diff);
      if(cell_dist < move_dist){
        move_dist = cell_dist;
      }
    }
  }

  return move_dist;
}


// 波のエフェクト
vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}


vec3 createWarter(vec2 position){
  vec3 color = vec3(
    0.2, 
    cnoise4(vec3(position * 10.0, abs(sin(uTime * 0.5)))), 
    1.0);

  vec2 q = vec2(0.0);
  q.x = cnoise4(vec3(position * 10.0, abs(cos(uTime * 0.5))));
  q.y = cnoise4(vec3(position * 10.0, abs(sin(uTime * 0.5))));

  vec2 r = vec2(0.0);
  r.x = cnoise4(vec3(position + 1.0 * q + vec2(1.7, 9.2), 0.15 * uTime));
  r.y = cnoise4(vec3(position + 1.0 * q + vec2(8.3, 2.8), 0.126 * uTime));

  float f = cnoise4(vec3(position + q, uTime * 0.1));

  color = mix(
    vec3(0.2078, 0.8, 0.4549), 
    vec3(0.102, 1.0, 0.4), 
    clamp((f * f) * 4.0, 0.0, 1.0)
  );

  color = mix(
    color, 
    vec3(0.0235, 0.502, 0.2392), 
    clamp(length(q), 0.0, 1.0)
  );

  color = mix(
    color, 
    vec3(0.102, 1.0, 0.4), 
    clamp(length(r.x), 0.0, 1.0)
  );

  vec3 calcColor = vec3(f * f * f + 0.6 * f * f + 0.5 * f) * color;

  return calcColor;
}

vec3 createMainColor(vec2 coord){
  float voronoiNoise1 = 0.0;
  float voronoiNoise2 = voronoi(coord * abs(sin(uTime * 0.5)));
  float voronoiNoise3 = 0.2;

  vec3 calcColor = vec3(voronoiNoise1, voronoiNoise2, voronoiNoise3);
  calcColor *= 2.0;
  calcColor = pow(calcColor,vec3(4.0));

  vec3 voronoiColor = vec3(calcColor);

  return voronoiColor;
}

vec3 createColor(vec2 position){
  vec2 coord = position;
  position *= 10.0;

  vec3 warter_color = createWarter(position);

  vec3 main_color = createMainColor(coord);
  
  //vec3 color = warter_color * main_color;
  vec3 color = warter_color + main_color;

  return color;
}


void main(){
  vec4 locationCoord = vertTexCoord;
  vec2 coord = vec2(locationCoord.x, locationCoord.y);
  vec2 originCoord = coord;
  coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);

  vec4 color = vec4(createColor(coord), 1.0);

  vec4 create = color;

  gl_FragColor = create;
}
