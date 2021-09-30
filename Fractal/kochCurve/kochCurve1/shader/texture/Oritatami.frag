precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec4 vertColor;
varying vec4 vertTexCoord;

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

float circle(vec2 position, float radius){
  return length(position) - radius;
}

float rect(vec2 position, vec2 size){
  position = abs(position) - size;

  return length(max(position, 0.0)) + min(max(position.x, position.y), 0.0);
}

vec4 draw(vec2 location){

  location = rotateLoop(location, uTime * 0.2);

  // vec2 d = vec2(circle(location, 0.2));
  
  vec2 size = vec2(0.2, 0.2);
  vec2 e = vec2(rect(location, size));
  
  vec2 color = mix(location, vec2(location.x , location.y), e.x + e.y);
  vec4 calcColor = vec4(color, 1.0, 1.0);

  vec4 calcTexture = texture2D(uTexture1, location);
  vec4 calcTexture1 = texture2D(uTexture1, location);
  vec4 calcTexture2 = texture2D(uTexture2, location);
  
  vec4 calc = calcColor * calcTexture;
  //vec4 calc = calcColor * calcTexture1 * calcTexture2;


  return calc;
}

void main(){
  
  vec4 coord = vertTexCoord;

  vec2 locationCoord = vec2(coord.x,coord.y);
  locationCoord = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);

  locationCoord = wave_effect(locationCoord);

  gl_FragColor = draw(locationCoord);
}