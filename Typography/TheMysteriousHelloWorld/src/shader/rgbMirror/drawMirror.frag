precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform bool uFlag;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uTexture3;

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

vec4 rgbMirror(vec2 coord){

  vec2 mirrorCoord = vec2(
    abs(coord.x * 2.0 - 1.0), 
    abs(coord.y * 2.0 - 1.0)
  );

  vec4 texture1 = texture2D(uTexture1, mirrorCoord);
  vec4 texture2 = texture2D(uTexture2, mirrorCoord);
  vec4 texture3 = texture2D(uTexture3, mirrorCoord);

  vec4 texture = texture1 * texture2 * texture3;

  return texture;
}

vec4 drawImage(vec2 coord){
  
  vec4 texture = rgbMirror(coord);

  return texture;
}

void main(){
  vec2 coord = vTexCoord;

  coord = wave_effect(coord);

  gl_FragColor = drawImage(coord);
}