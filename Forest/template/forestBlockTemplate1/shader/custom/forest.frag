precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture;

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
    fbm(vec3(position * 10.0, abs(sin(uTime * 0.5)))), 
    1.0);

  return color;
}

vec3 createMainColor(vec2 coord){
  float voronoiNoise1 = 0.0;
  float voronoiNoise2 = voronoi(coord * abs(sin(uTime * 0.5)));
  float voronoiNoise3 = voronoi(coord * abs(sin(uTime * 0.5)));

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
  coord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);

  vec4 color = vec4(createColor(coord), 1.0);
  vec4 calcTexture = texture2D(uTexture, coord);

  vec4 create = color * calcTexture;

  gl_FragColor = create;
}
