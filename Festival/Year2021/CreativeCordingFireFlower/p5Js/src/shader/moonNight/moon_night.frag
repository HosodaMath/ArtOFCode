precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
varying vec2 vTexCoord;
const float PI2 = 6.28318530718;
const float PI = 3.141592653589793;

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
  vec2 centered_coord = position2 - vec2(cos(time * 0.1), sin(time * 0.1));
  centered_coord = rotate(centered_coord, radian);

  for(float i = 1.0; i <= 50.0; i++){
    vec2 star_position = vec2(cos(i) * 250.0, sin(i * i * i) * 250.0);
    float z = mod(i * i - 10.0 * time, 256.0);
    float fade = (256.0 - z) / 256.0;
    vec2 blob_coord = star_position / z;
    grad += ((fade / 384.0) / pow(length(centered_coord - blob_coord), 1.5) * fade );
  }

  background_color += grad;

  return background_color;
}

void main(){
  float radian = radians(time * 3.15);
  vec3 background_color = mix(vec3(0.0157, 0.0, 0.2078),vec3(0.0902, 0.1176, 0.3686), vTexCoord.y);
  float scale = tan(0.3 * time) + 5.0;
  vec2 position2 = ((vTexCoord - 0.5) * scale);
  
  vec3 star_field = starFeild(position2, radian, background_color);

  gl_FragColor = vec4(star_field, 1.0);
}