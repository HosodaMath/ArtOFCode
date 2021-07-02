/*
  参考資料
  https://github.com/aadebdeb/PCD_Tokyo_2020_Workshop
*/
precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
varying vec2 vTexCoord;

const float PI2 = 6.28318530718;

//-------------------------ここから自作template or 参考コードを使用------------------------------//

// 波のエフェクト
vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.x += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + time * PI2);
  coord.y += 0.0015 * cos(coord.y * 250.0 + time * PI2);
  
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

//------------------------ ここからレイマーチングコード--------------------------------//

// 球体を描く
float GSphere(vec3 position, float radius){
  return length(position) - radius;
}

// ボックスを描く
float GBox(vec3 position, vec3 size){
  vec3 d = abs(position) - size;

  return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0);
}

// 繰り返しで球体を配置する
float map(vec3 position){
  position = mod(position, 5.0) - 2.5;
  
  position.x += cos(time * 0.5);
  position.y += sin(time * 0.5);
  
  // float radius = 1.0;
  float radius = abs(cos(time * 0.5));
  float sphere = GSphere(position, radius);

  vec3 size = vec3(1.0, 1.0, 1.0);
  float box = GBox(position, size);

  return box;
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
// 背景は黒くなる
vec3 raymarch(vec3 ro, vec3 rd, vec2 coord){
  vec3 position = ro;
  for(int i = 0; i < 64; i++){
    float d = map(position);
    position += d * rd;
    if(d < 0.01){
      vec3 normal = calcNormal(position);

      return normal * 0.5 + 0.5;
    }
  }

  return background(coord);
}



void main() {
  // 正規化
  vec2 coord = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
  coord = wave_effect(coord);

  vec3 ro = vec3(10.0 * vec2(0.5, 0.5) - 5.0, -time);
  vec3 ta = vec3(0.0, 0.0, -5.0 - time);

  vec3 cameraZ = normalize(ta - ro);

  vec3 normalColor = vec3(0.3765, 1.0, 0.7608);
  vec3 cameraX = normalize(cross(cameraZ, normalColor));
  vec3 cameraY = cross(cameraX, cameraZ);

  vec3 rd = normalize(cameraX * coord.x + cameraY * coord.y + 1.5 * cameraZ);


  vec3 color = raymarch(ro, rd, coord);
  gl_FragColor = vec4(color, 1.0);
}
