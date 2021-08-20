precision highp float;
precision highp sampler2D;

uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uTexture;

varying vec2 vTexCoord;

#define PI2 6.28318530718
#define PI 3.141592653589793

vec2 wave_effect(vec2 coord){
  
  coord.x += 0.0035 * cos(coord.x * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.x * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * sin(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}

vec3 fade(vec3 v){
  return vec3(1.0, 1.0, 1.0);
}

vec2 rotate(vec2 position, float radian){
  float cs = cos(radian);
  float sn = sin(radian);

  return position * mat2(cs, -sn, sn, cs);
}

vec3 starFeild(vec2 position2, float radian, vec3 background_color){
  float grad = 0.0;
  float fade = 0.0;
  float z = 0.0;
  vec2 centered_coord = position2 - vec2(cos(uTime * 0.1), sin(uTime * 0.1));
  centered_coord = rotate(centered_coord, radian);

  for(float i = 1.0; i <= 50.0; i++){
    vec2 star_position = vec2(cos(i) * 250.0, sin(i * i * i) * 250.0);
    float z = mod(i * i - 10.0 * uTime, 256.0);
    float fade = (256.0 - z) / 128.0;
    vec2 blob_coord = star_position / z;
    grad += ((fade / 384.0) / pow(length(centered_coord - blob_coord), 1.5) * fade );
  }

  background_color += grad;

  return background_color;
}

/*
ウーム😑
float flower(vec2 coord, float flowerPetal){
  coord = (1.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
  float u = sin((atan(coord.x, coord.y) + uTime * 0.5) * flowerPetal);
  float t = 0.01 / abs(u - length(coord));

  return t;
}*/


vec4 mirror(vec2 coord){

  vec2 mirrorCoord = vec2(
    abs(coord.x * 2.0 - 1.0), 
    abs(coord.y * 2.0 - 1.0)
  );

  vec4 texture = texture2D(uTexture, mirrorCoord);

  return texture;
}

vec4 drawImage(vec2 coord){
  float radian = radians(uTime * 3.15);

  vec3 color = mix(
    vec3(0.6824, 0.7098, 1.0), 
    vec3(0.5569, 1.0, 0.7922), 
    coord.y
  );

  vec3 background_color = color;
  float scale = cos(0.3 * uTime) + 2.0;
  vec2 position2 = (((gl_FragCoord.xy / uResolution) - 0.5) * scale);
  
  vec4 star_field = vec4(starFeild(position2, radian, background_color), 1.0);

  // これを単体で出力すると意図したものと異なる映像が出力される
  // waveWaterColor
  // https://openprocessing.org/sketch/1246469
  vec4 texture = mirror(coord);

  vec4 colorMix = vec4(mix(star_field.xyz,texture.rgb , coord.y), 1.0);

  return colorMix;
}

void main(){
  vec2 coord = vTexCoord;

  coord = wave_effect(coord);

  // coord = (1.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);

  gl_FragColor = drawImage(coord);
}