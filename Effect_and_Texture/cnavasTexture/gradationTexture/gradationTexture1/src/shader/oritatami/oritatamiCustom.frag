precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec2 vTexCoord;

#define PI2 6.28318530718

vec2 wave_effect(vec2 coord){
  coord.x += 0.0035 * cos(coord.x * 100.0 + uTime * PI2);
  coord.x += 0.0015 * cos(coord.x * 250.0 + uTime * PI2);
  
  coord.y += 0.0035 * sin(coord.y * 100.0 + uTime * PI2);
  coord.y += 0.0015 * sin(coord.y * 250.0 + uTime * PI2);
  
  return coord;
}

vec2 rotateLoop(vec2 location, float radian){
  const int iter = 8;
  for(int i = 0; i < iter; i++){
    location = abs(location * 1.5) - 1.0;
    float a = radian * float(i);
    float c = cos(a);
    float s = sin(a);
    location *= mat2(c, s, -s, c);
  }

  return location;
}

float rect(vec2 position, vec2 size){
  position = abs(position) - size;

  return length(max(position, 0.0)) + min(max(position.x, position.y), 0.0);
}

vec4 calcTexture(sampler2D uTexture,  vec2 coord){
  vec4 texture = texture2D(uTexture, coord);
  
  return texture;
}


vec4 draw(vec2 location, vec2 originCoord){
  vec2 coord = location;

  location = rotateLoop(location, uTime * 0.2);
  
  vec2 size = vec2(0.2, 0.2);
  vec2 e = vec2(rect(location, size));
  
  vec2 color = mix(location, vec2(location.x , location.y), e.x + e.y);

  vec4 drawColor = vec4(color, 1.0, 1.0) * calcTexture(uTexture1, location) * calcTexture(uTexture2, originCoord);

  return drawColor;
}

void main(){
  vec2 coord = vTexCoord;
  vec2 location = (1.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);;

  location = wave_effect(location);

  gl_FragColor = draw(location, coord);
}