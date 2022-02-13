precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
// uniform sampler2D uTexture;
varying vec3 vNoise;
varying vec3 vNormal;
varying vec2 vTexCoord;
const float PI = 3.141592653589793;
const float PI2 = 6.28318530718;

/*
  繰り返し
*/
vec3 map(vec3 position){
  return mod(position, 5.0) - 2.5;
}

/*
  sphereオブジェクトまでの最短距離を求める
  球体はどの方向から見ても変わらない
  カメラで見るのでカメラが置かれている座標を入れる
  球体の大きさを1.0としてカメラの位置を3.0として計算すると。
  3.0 - 1.0 = 2.0となる。
  球体とカメラの最短距離は2.0となる。
*/
float sphere(vec3 position, float sphereSize){
  return length(map(position)) - sphereSize;
}

float box(vec3 position, vec3 boxSize){
  vec3 d = abs(map(position)) - boxSize;

  return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0);
}

/*
  法線を求める
*/
vec3 calcNormal(vec3 rayPosition, vec3 boxSize ){
  float d = 0.0001;
  float x = box(rayPosition + vec3(d, 0.0, 0.0), boxSize) - box(rayPosition + vec3(-d, 0.0, 0.0), boxSize);
  float y = box(rayPosition + vec3(0.0, d, 0.0), boxSize) - box(rayPosition + vec3(0.0, -d, 0.0), boxSize);
  float z = box(rayPosition + vec3(0.0, 0.0, d), boxSize) - box(rayPosition + vec3(0.0, 0.0, -d), boxSize);
  vec3 normal = normalize(vec3(x, y, z));
  return normal;
}

void main(void){
  // vec2 coord = vTexCoord;
  vec2 coord = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
  
  // カメラの位置
  vec3 cameraPosition = vec3(0.0, 0.0, 2.0);
  
  // カメラの向き
  // zがマイナスになっている
  vec3 cameraDirection = vec3(0.0, 0.0, -1.0);
  
  // カメラの上方向
  vec3 cameraUp = vec3(0.0, 1.0, 0.0);
  
  // 横方向の算出
  // カメラの向きとカメラの上方向から算出
  vec3 cameraSide = cross(cameraDirection, cameraUp);
  
  // フォーカスの深度
  float targetDepth = 0.1;
  
  // 視野角 field of view
  const float angle = 60.0;
  const float fov = angle * 0.5 * PI / 180.0;

  // 視野角を考慮したrayを求める
  float x = sin(fov) * coord.x;
  float y = sin(fov) * coord.y;
  float z = -cos(fov);
  vec3 ray = normalize(vec3(x, y, z));

  const int rayLoopMax = 64;
  
  // 球体とBoxの大きさ
  const float sphereSize = 1.0;

  float size = abs(sin(uTime * 0.25));
  vec3 boxSize = vec3(size, size, size);
  
  // 距離
  float objectDistance = 0.0;

  // rayの長さ
  float rayLength = 0.0;
  
  // rayの初期位置はカメラの位置と同じ
  vec3 rayPosition = cameraPosition;
  
  // rayを伸ばしていく
  for(int rayLoop = 0; rayLoop < rayLoopMax; rayLoop++){
    // rayの位置から距離を求める
    objectDistance = box(rayPosition, boxSize);
    // rayの長さ
    // rayLength += objectDistance1;
    rayLength += objectDistance;
    // rayの位置を求める
    // ray * rayの長さ + カメラの位置
    rayPosition = cameraPosition + ray * rayLength;
  }

  // 平行光源
  vec3 directionLigth = vec3(-0.5, 0.5, 0.5);

  vec4 noiseColor = vec4(vNoise, 1.0);

  // rayの衝突判定
  // rayが突き抜けた場合マイナスになってしまうためabsを使い絶対値にしている。
  if(abs(objectDistance) < 0.001){
    // 法線を求める
    vec3 normal = calcNormal(rayPosition, boxSize);
    // ライティング
    float diffuese = clamp(dot(directionLigth, normal), 0.1, 1.0);
    vec4 color =  vec4(diffuese, diffuese, diffuese, 1.0);
    vec4 bgColor = vec4(0.0, 0.0, 0.1, 1.0);
    color += bgColor;
    color += noiseColor;
    // color += texture2D(uTexture, coord);
    gl_FragColor = color;
    //gl_FragColor = vec4(normal, 1.0);
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}